import DatabaseSource from "../../database/databaseSource";
import { Route } from "../../models/Route";

export async function getRoutesByUserFeed(databaseSource: DatabaseSource, userId: string, offset: number, limit: number): Promise<Route[]> {
    return await databaseSource.prepare("SELECT center_latitude AS centerLatitude, center_longitude AS centerLongitude, routes.* FROM routes WHERE user = ?1 ORDER BY timestamp DESC LIMIT ?3 OFFSET ?2", userId, offset, limit).all<Route>();
};
