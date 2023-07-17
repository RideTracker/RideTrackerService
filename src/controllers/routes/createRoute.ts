import { Route } from "../../models/Route";

export default async function createRoute(database: D1Database, userId: string, center: {
    latitude: number;
    longitude: number;
}, polyline: string, distance: number, duration: string, color: string): Promise<Route> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await database.prepare("INSERT INTO routes (id, user, center_latitude, center_longitude, polyline, distance, duration, color, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *").bind(id, userId, center.latitude, center.longitude, polyline, distance, duration, color, timestamp).first<Route>();
};
