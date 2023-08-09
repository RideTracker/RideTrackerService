import { DatabaseSource } from "@ridetracker/authservice";
import { RouteWaypoint } from "../../../models/RouteWaypoint";

export async function getRoutesWaypoints(databaseSource: DatabaseSource, routeIds: string[]): Promise<RouteWaypoint[]> {
    return await databaseSource.prepare("SELECT place_id AS placeId, route_waypoints.* FROM route_waypoints WHERE route IN (SELECT value FROM json_each(?1))", JSON.stringify(routeIds)).all<RouteWaypoint>();
};
