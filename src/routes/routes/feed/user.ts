import { getRoutesByUserFeed } from "../../../controllers/routes/getRoutesByUserFeed";
import { getRoutesWaypoints } from "../../../controllers/routes/waypoints/getRoutesWaypoints";

export const userRoutesRequestSchema = {
    content: {
        offset: {
            type: "number",
            required: true
        }
    }
};

export async function handleUserRoutesRequest(request: RequestWithKey, env: Env) {
    const { offset } = request.content;

    const routes = await getRoutesByUserFeed(env.DATABASE, request.key.user, offset, 5);
    const routesWaypoints = await getRoutesWaypoints(env.DATABASE, routes.map((route) => route.id));

    return Response.json({
        success: true,

        routes: routes.map((route) => {
            const routeWaypoints = routesWaypoints.filter((routeWaypoint) => routeWaypoint.route === route.id);
            
            return {
                id: route.id,
                polyline: route.polyline,
                timestamp: route.timestamp,

                waypoints: routeWaypoints.map((routeWaypoint) => {
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
