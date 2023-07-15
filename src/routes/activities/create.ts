import { createActivity } from "../../controllers/activities/createActivity";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { Bike } from "../../models/bike";
import { triggerAlarm } from "../../controllers/alarms/triggerAlarm";

export const createActivityRequestSchema = {
    content: {
        title: {
            type: "string"
        },
        
        description: {
            type: "string"
        },
        
        bikeId: {
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

export async function handleCreateActivityRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>) {
    const { visibility, title, description, bikeId, sessions } = request.content;

    const bike: Bike | null = bikeId && await getBikeById(env.DATABASE, bikeId);
    
    if(bikeId && bike?.user !== request.key.user)
        return Response.json({ success: false });

    const activity = await createActivity(env.DATABASE, request.key.user, visibility);

    if(!activity)
        return Response.json({ success: false });

    await env.BUCKET.put(`activities/${activity.id}.json`, JSON.stringify(sessions), {
        customMetadata: {
            "type": "activity",
            "user": request.key.user,
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

            return triggerAlarm(env, "Activity Processing Failed Alarm", "```\n" + JSON.stringify(text, null, 4) + "\n```");
        }
    }));

    return Response.json({
        success: true,

        activity: {
            id: activity.id
        }
    });
};
