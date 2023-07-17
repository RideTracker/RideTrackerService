import { RouteWaypoint } from "../../../models/RouteWaypoint";

export async function getRoutesWaypoints(database: D1Database, routeIds: string[]): Promise<RouteWaypoint[]> {
    const query = await database.prepare("SELECT place_id AS placeId, route_waypoints.* FROM route_waypoints WHERE route IN (SELECT value FROM json_each(?1))").bind(JSON.stringify(routeIds)).all<RouteWaypoint>();

    return query.results ?? [];
};
