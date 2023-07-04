import { encode } from "@googlemaps/polyline-codec";
import { createActivity } from "../../controllers/activities/createActivity";
import { createActivitySummary } from "../../controllers/activities/summary/createActivitySummary";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { Bike } from "../../models/bike";
import { handleActivitySummaryRequest } from "./[activityId]/summary";

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
    const { title, description, bikeId, sessions } = request.content;

    const bike: Bike | null = bikeId && await getBikeById(env.DATABASE, bikeId);
    
    if(bikeId && bike?.user !== request.key.user)
        return Response.json({ success: false });

    const polylines = [];

    for(let session of sessions) {
        const path = [];

        for(let location of session.locations) {
            path.push([ location.coords.latitude, location.coords.longitude ]);
        }

        polylines.push(encode(path, 5));
    }

    const activity = await createActivity(env.DATABASE, request.key.user, title ?? null, description ?? null, bikeId ?? null, JSON.stringify(polylines));

    if(!activity)
        return Response.json({ success: false });

    await env.BUCKET.put(`activities/${activity.id}.json`, JSON.stringify(sessions), {
        customMetadata: {
            "type": "activity",
            "user": request.key.user,
            "activity": activity.id
        }
    });
    
    /*await handleActivitySummaryRequest({
        key: request.key,
        params: {
            activityId: activity.id
        }
    }, env);*/

    console.log("call durable object");

    const durableObjectId = env.ACTIVITY_DURABLE_OBJECT.idFromName("default");
    console.log("id from name " + durableObjectId);

    const durableObject = env.ACTIVITY_DURABLE_OBJECT.get(durableObjectId);

    await durableObject.fetch(request.url, {
        method: "POST",
        body: JSON.stringify({
            activityId: activity.id
        })
    });

    return Response.json({
        success: true,

        activity: {
            id: activity.id
        }
    });
};
