import { RouteWaypoint } from "../../../models/RouteWaypoint";
import { RouteWaypointType } from "../../../models/RouteWaypointType";

export default async function createRouteWaypoint(database: D1Database, routeId: string, name: string, type: RouteWaypointType, placeId: string | null, coordinate: {
    latitude: number;
    longitude: number;
} | null, coordinates: string | null, polyline: string | null, distance: number | null, duration: string | null, index: number): Promise<RouteWaypoint> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await database.prepare("INSERT INTO route_waypoints (id, route, name, type, place_id, latitude, longitude, coordinates, polyline, distance, duration, 'index', timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *").bind(id, routeId, name, type, placeId, coordinate?.latitude ?? null, coordinate?.longitude ?? null, coordinates, polyline, distance, duration, index, timestamp).first<RouteWaypoint>();
};
