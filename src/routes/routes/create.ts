import createRoute from "../../controllers/routes/createRoute";
import { decode } from "@googlemaps/polyline-codec";
import { getCenter } from "geolib";
import createRouteWaypoint from "../../controllers/routes/waypoints/createRouteWaypoint";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";
import { DatabaseSource } from "@ridetracker/authservice";

export const createRouteRequestSchema = {
    content: {
        polyline: {
            type: "string",
            required: true
        },
        
        distance: {
            type: "number",
            required: true
        },
        
        duration: {
            type: "string",
            required: true
        },

        waypoints: {
            type: "array",
            required: true,

            schema: {
                type: {
                    type: "string",
                    required: true
                },

                searchPrediction: {
                    type: "object",
                    required: false,

                    schema: {
                        name: {
                            type: "string",
                            required: true
                        },

                        placeId: {
                            type: "string",
                            required: false
                        },

                        location: {
                            type: "object",
                            required: false,

                            schema: {
                                latitude: {
                                    type: "number",
                                    required: true
                                },
                                
                                longitude: {
                                    type: "number",
                                    required: true
                                }
                            }
                        }
                    }
                },

                path: {
                    type: "object",
                    required: false,

                    schema: {
                        original: {
                            type: "string",
                            required: true
                        },
                        
                        route: {
                            type: "string",
                            required: true
                        },

                        distance: {
                            type: "number",
                            required: true
                        },

                        duration: {
                            type: "string",
                            required: true
                        }
                    }
                }
            }
        }
    }
};

export async function handleCreateRouteRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { polyline, distance, duration, waypoints } = request.content;

    const decodedPolyline = decode(polyline).map((coordinate) => {
        return {
            latitude: coordinate[0],
            longitude: coordinate[1]
        }
    });

    const center = getCenter(decodedPolyline);

    if(!center)
        return Response.json({ success: false });

    const color: number[] = [];

    for(let index = 0; index < 3; index++)
        color.push(Math.floor(Math.random() * 200));

    const route = await createRoute(databaseSource, request.key.user, center, polyline, distance, duration, JSON.stringify(color));

    if(!route)
        return Response.json({ success: false });

    await Promise.all(waypoints.map(async (waypoint: any, index: number) => {
        if(waypoint.type === "SEARCH_PREDICTION")
            return createRouteWaypoint(databaseSource, route.id, waypoint.searchPrediction.name, "SEARCH_PREDICTION", waypoint.searchPrediction.placeId, waypoint.searchPrediction.location ?? null, null, null, null, null, index);
        
        if(waypoint.type === "PATH")
            return createRouteWaypoint(databaseSource, route.id, "Custom path", "PATH", null, null, waypoint.path.original, waypoint.path.route, waypoint.path.distance, waypoint.path.duration, index);
    }));

    return Response.json({
        success: true,

        route: {
            id: route.id
        }
    });
};
