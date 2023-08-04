import { Activity } from "@ridetracker/ridetrackertypes";

export async function getActivitiesByUser(database: D1Database, user: string, offset: number = 0): Promise<Activity[]> {
    return (await database.prepare("SELECT start_area AS startArea, finish_area AS finishArea, local_id AS localId, activities.* FROM activities WHERE user = ? AND status = 'processed' ORDER BY timestamp DESC LIMIT 10 OFFSET ?").bind(user, offset).all<Activity>()).results ?? [];
};
