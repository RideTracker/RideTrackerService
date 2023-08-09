import { Activity } from "@ridetracker/ridetrackertypes";
import DatabaseSource from "../../database/databaseSource";

export async function getActivitiesWithoutSummary(databaseSource: DatabaseSource): Promise<Activity[]> {
    return await databaseSource.prepare("SELECT start_area AS startArea, finish_area AS finishArea, local_id AS localId, activities.* FROM activities WHERE (SELECT COUNT(id) FROM activity_summary WHERE activity_summary.id = activities.id) = 0 ORDER BY activities.timestamp ASC").all<Activity>();
};
