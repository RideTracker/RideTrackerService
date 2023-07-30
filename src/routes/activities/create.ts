import { createActivity } from "../../controllers/activities/createActivity";
import { VersionFeatureFlags } from "../../models/FeatureFlags";
import { getActivityByLocalId } from "../../controllers/activities/getActivityByLocalId";
import { getDevice } from "../../controllers/devices/getDevice";

export const createActivityRequestSchema = {
    content: {
        localId: {
            type: "string"
        },

        visibility: {
            type: "enum",
            required: true,

            schema: [ "PUBLIC", "FOLLOWERS_ONLY", "UNLISTED", "PRIVATE" ]
        },

        sessions: {
            type: "array",
            required: true,

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
        }
    }
};

export async function handleCreateActivityRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, versionFeatureFlags: VersionFeatureFlags) {
    let { localId } = request.content;
    const { visibility, sessions } = request.content;

    let userId = request.key.user;

    if(request.key.type === "device") {
        const device = await getDevice(env.DATABASE, request.key.user);

        if(!device)
            return Response.json({ success: false });
        
        userId = device.user;
    }

    // localId was introduced in RideTrackerApp-0.9.3
    if(!localId) {
        if(request.userAgent.isBelow("RideTrackerApp-0.9.3")) {
            localId = sessions[0].id;
        }
    }

    const existingActivity = await getActivityByLocalId(env.DATABASE, userId, localId);

    if(existingActivity)
        return Response.json({ success: false, message: "You have already uploaded this activity!" });

    const activity = await createActivity(env.DATABASE, userId, visibility, localId);

    if(!activity)
        return Response.json({ success: false });

    await env.BUCKET.put(`activities/${activity.id}.json`, JSON.stringify(sessions), {
        customMetadata: {
            "type": "activity",
            "user": userId,
            "activity": activity.id
        }
    });

    const durableObjectId = env.ACTIVITY_DURABLE_OBJECT.idFromName("default");
    const durableObject = env.ACTIVITY_DURABLE_OBJECT.get(durableObjectId);

    context.waitUntil(durableObject.fetch(request.url, {
        method: "POST",
        body: JSON.stringify({
            activityId: activity.id
        })
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
