import { DatabaseSource } from "@ridetracker/authservice";
import { CoordinateBounds } from "../../models/CoordinateBounds";
import { Route } from "../../models/Route";

export async function getRoutesByFeed(databaseSource: DatabaseSource, offset: number, limit: number, bounds: CoordinateBounds): Promise<Route[]> {
    return await databaseSource.prepare(
        "SELECT center_latitude AS centerLatitude, center_longitude AS centerLongitude, routes.*" +
        " FROM routes" +
        " WHERE (center_latitude > ?3 AND center_latitude < ?4)" +
        " AND (center_longitude > ?5 AND center_longitude < ?6)" +
        " ORDER BY timestamp DESC LIMIT ?2 OFFSET ?1",
        offset, limit, bounds.latitude.south, bounds.latitude.north, bounds.longitude.west, bounds.longitude.east).all<Route>();
};

