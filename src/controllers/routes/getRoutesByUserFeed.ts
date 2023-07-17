import { Route } from "../../models/Route";

export async function getRoutesByUserFeed(database: D1Database, userId: string, offset: number, limit: number): Promise<Route[]> {
    const query = await database.prepare("SELECT center_latitude AS centerLatitude, center_longitude AS centerLongitude, routes.* FROM routes WHERE user = ?1 ORDER BY timestamp DESC LIMIT ?3 OFFSET ?2").bind(userId, offset, limit).all<Route>();

    return query.results ?? [];
};
