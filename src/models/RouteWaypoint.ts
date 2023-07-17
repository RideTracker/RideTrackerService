import { RouteWaypointType } from "./RouteWaypointType";

export type RouteWaypoint = {
    id: string;
    route: string;
    type: RouteWaypointType;
    name: string;
    placeId?: string;
    latitude?: number;
    longitude?: number;
    coordinates?: string;
    polyline?: string;
    distance?: number;
    duration?: string;
    index: number;
    timestamp: number;
};
