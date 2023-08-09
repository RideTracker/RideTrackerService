import { Activity } from "@ridetracker/ridetrackertypes";
import { DatabaseSource } from "@ridetracker/authservice";

export async function getActivitiesByUser(databaseSource: DatabaseSource, user: string, offset: number = 0): Promise<Activity[]> {
    return await databaseSource.prepare("SELECT start_area AS startArea, finish_area AS finishArea, local_id AS localId, activities.* FROM activities WHERE user = ? AND status = 'processed' ORDER BY timestamp DESC LIMIT 10 OFFSET ?", user, offset).all<Activity>();
};
