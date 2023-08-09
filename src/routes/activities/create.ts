import { createActivity } from "../../controllers/activities/createActivity";
import { VersionFeatureFlags } from "../../models/FeatureFlags";
import { getActivityByLocalId } from "../../controllers/activities/getActivityByLocalId";
import { getDevice } from "../../controllers/devices/getDevice";

export const createActivityRequestSchema = {
    content: {
        visibility: {
            type: "enum",
            required: true,

            schema: [ "PUBLIC", "FOLLOWERS_ONLY", "UNLISTED", "PRIVATE" ]
        },

        sessions: {
            type: "array",
            required: false,

            schema: {
                id: {
                    type: "string",
                    required: true
                },

                locations: {
                    type: "array",
                    required: true,

                    schema: {
                        coords: {
                            type: "object",
                            required: true,
        
                            schema: {
                                accuracy: {
                                    type: "number"
                                },
                                altitude: {
                                    type: "number"
                                },
                                altitudeAccuracy: {
                                    type: "number"
                                },
                                heading: {
                                    type: "number"
                                },
                                latitude: {
                                    type: "number"
                                },
                                longitude: {
                                    type: "number"
                                },
                                speed: {
                                    type: "number"
                                }
                            }
                        },
        
                        timestamp: {
                            type: "number",
                            required: true
                        }
                    }
                },

                timestamp: {
                    type: "number",
                    required: true
                }
            }
        },

        recording: {
            type: "object",
            required: false,

            schema: {
                id: {
                    type: "string",
                    required: true
                },

                sessions: {
                    type: "array",
                    required: true,

                    schema: {
                        type: "object"
                    }
                }
            }
        }
    }
};

export async function handleCreateActivityRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, versionFeatureFlags: VersionFeatureFlags) {
    const { visibility, sessions, recording } = request.content;

    let userId = request.key.user;

    if(request.key.type === "device") {
        const device = await getDevice(env.DATABASE, request.key.user);

        if(!device)
            return Response.json({ success: false });
        
        userId = device.user;
    }

    let localId: string;

    if(!recording && !sessions)
        return Response.json({ success: false, message: "No recording attached." });

    // RecordingV1 was deprecated in RideTrackerApp-0.9.3
    if(!recording) {
        if(request.userAgent.isBelow("RideTrackerApp-0.9.3")) {
            localId = sessions[0].id;
        }
        else
            return Response.json({ success: false, message: "Unknown recording manifest." });
    }
    else
        localId = recording.id;

    const existingActivity = await getActivityByLocalId(env.DATABASE, userId, localId);

    if(existingActivity)
        return Response.json({ success: false, message: "You have already uploaded this activity!" });

    const activity = await createActivity(env.DATABASE, userId, visibility, localId);

    if(!activity)
        return Response.json({ success: false });

    await env.BUCKET.put(`activities/${activity.id}.json`, JSON.stringify(recording ?? sessions), {
        customMetadata: {
            "type": "activity",
            "user": userId,
            "activity": activity.id
        }
    });

    //const durableObjectId = env.ACTIVITY_DURABLE_OBJECT.idFromName("default");
    //const durableObject = env.ACTIVITY_DURABLE_OBJECT.get(durableObjectId);

    context.waitUntil(env.ROUTE_SERVICE.fetch(`https://route-service.ridetracker.app/api/activities/${activity.id}/process`, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${env.ROUTE_SERVICE_CLIENT_ID}:${env.ROUTE_SERVICE_CLIENT_TOKEN}`,
        }
    }).then(async (response) => {
        if(!response.ok) {
            const text = await response.json();

            return context.waitUntil(env.ANALYTICS_SERVICE.fetch(env.ANALYTICS_SERVICE_HOST + "/api/error", {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${env.ANALYTICS_SERVICE_CLIENT_ID}:${env.ANALYTICS_SERVICE_CLIENT_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "ACTIVITY_PROCESSING_ERROR",
                    data: "An error was thrown during the activity processing.",
                    service: "RideTrackerService",
                    environment: env.ENVIRONMENT,
                    payload: JSON.stringify({
                        response: {
                            statusCode: response.status,
                            statusText: response.statusText,
                            responseBody: text
                        },
                        request: {
                            userAgent: request.headers.get("User-Agent"),
                            resource: `${request.method} ${request.url}`,
                            remoteAddress: request.headers.get("CF-Connecting-IP")
                        }
                    })
                })
            }));
        }
    }));

    return Response.json({
        success: true,

        activity: {
            id: activity.id
        }
    });
};
