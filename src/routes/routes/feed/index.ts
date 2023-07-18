import { getRoutesByFeed } from "../../../controllers/routes/getRoutesByFeed";
import { getRoutesByUserFeed } from "../../../controllers/routes/getRoutesByUserFeed";
import { getRoutesWaypoints } from "../../../controllers/routes/waypoints/getRoutesWaypoints";
import { getUsersById } from "../../../controllers/users/getUsersByIds";

export const routesFeedRequestSchema = {
    content: {
        offset: {
            type: "number",
            required: true
        },

        bounds: {
            type: "object",
            required: true,

            schema: {
                latitude: {
                    type: "object",
                    required: true,

                    schema: {
                        north: {
                            type: "number",
                            required: true
                        },
                        
                        south: {
                            type: "number",
                            required: true
                        }
                    }
                },
                
                longitude: {
                    type: "object",
                    required: true,

                    schema: {
                        west: {
                            type: "number",
                            required: true
                        },
                        
                        east: {
                            type: "number",
                            required: true
                        }
                    }
                }
            }
        }
    }
};

export async function handleRoutesFeedRequest(request: RequestWithKey, env: Env) {
    const { offset, bounds } = request.content;

    const routes = await getRoutesByFeed(env.DATABASE, offset, 5, bounds);
    const routesUsers = (routes.length)?(await getUsersById(env.DATABASE, routes.map((route) => route.user))):(undefined);
    const routesWaypoints = (routes.length)?(await getRoutesWaypoints(env.DATABASE, routes.map((route) => route.id))):(undefined);

    return Response.json({
        success: true,

        routes: routes.map((route) => {
            const routeUser = routesUsers?.find((user) => user.id === route.user);
            const routeWaypoints = routesWaypoints?.filter((routeWaypoint) => routeWaypoint.route === route.id);
            
            return {
                id: route.id,
                polyline: route.polyline,
                timestamp: route.timestamp,
                distance: route.distance,
                duration: route.duration,
                color: route.color,

                user: routeUser && {
                    id: routeUser.id,
                    name: routeUser.firstname + " " + routeUser.lastname,
                    avatar: routeUser.avatar
                },

                waypoints: routeWaypoints?.map((routeWaypoint) => {
                    return {
                        id: routeWaypoint.id,
                        type: routeWaypoint.type,

                        path: (routeWaypoint.type === "PATH") && {
                            original: routeWaypoint.coordinates,
                            route: routeWaypoint.polyline,
                            distance: routeWaypoint.distance,
                            duration: routeWaypoint.duration
                        },

                        searchPrediction: (routeWaypoint.type === "SEARCH_PREDICTION") && {
                            name: routeWaypoint.name,
                            placeId: routeWaypoint.placeId,
                            location: {
                                latitude: routeWaypoint.latitude,
                                longitude: routeWaypoint.longitude
                            }
                        }
                    };
                })
            };
        }),

        offset: offset + routes.length,
        limit: 5
    });
};
