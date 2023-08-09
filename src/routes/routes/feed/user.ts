import { getRoutesByUserFeed } from "../../../controllers/routes/getRoutesByUserFeed";
import { getRoutesWaypoints } from "../../../controllers/routes/waypoints/getRoutesWaypoints";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../../models/FeatureFlagsExecution";

export const userRoutesRequestSchema = {
    content: {
        offset: {
            type: "number",
            required: true
        }
    }
};

export async function handleUserRoutesRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { offset } = request.content;

    const routes = await getRoutesByUserFeed(databaseSource, request.key.user, offset, 5);
    const routesWaypoints = (routes.length)?(await getRoutesWaypoints(databaseSource, routes.map((route) => route.id))):(undefined);

    return Response.json({
        success: true,

        routes: routes.map((route) => {
            const routeWaypoints = routesWaypoints?.filter((routeWaypoint) => routeWaypoint.route === route.id);
            
            return {
                id: route.id,
                polyline: route.polyline,
                timestamp: route.timestamp,
                distance: route.distance,
                duration: route.duration,
                color: route.color,

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
