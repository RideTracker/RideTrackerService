import { Activity } from "@ridetracker/ridetrackertypes";
import { DatabaseSource } from "@ridetracker/authservice";

export async function getActivities(databaseSource: DatabaseSource): Promise<Activity[]> {
    return await databaseSource.prepare("SELECT start_area AS startArea, finish_area AS finishArea, local_id AS localId, activities.* FROM activities ORDER BY timestamp DESC").all<Activity>();
};
