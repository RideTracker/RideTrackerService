import { ActivitySummary } from "@ridetracker/ridetrackertypes";
import DatabaseSource from "../../../database/databaseSource";

export async function getActivitySummaryById(databaseSource: DatabaseSource, id: string): Promise<ActivitySummary[]> {
    return await databaseSource.prepare("SELECT personal_best AS personalBest, activity_summary.* FROM activity_summary WHERE id = ?", id).all<ActivitySummary>();
};
