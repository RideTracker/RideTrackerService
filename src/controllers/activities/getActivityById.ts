import { Activity } from "@ridetracker/ridetrackertypes";

export async function getActivityById(database: D1Database, id: string): Promise<Activity> {
    return await database.prepare("SELECT start_area AS startArea, finish_area AS finishArea, local_id AS localId, activities.* FROM activities WHERE id = ?").bind(id).first<Activity>();
};
