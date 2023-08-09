import { ActivityComment } from "@ridetracker/ridetrackertypes";
import DatabaseSource from "../../../database/databaseSource";

export async function getActivityComments(databaseSource: DatabaseSource, activity: string): Promise<ActivityComment[]> {
    return await databaseSource.prepare("SELECT * FROM activity_comments WHERE activity = ? ORDER BY timestamp DESC", activity).all<ActivityComment>();
};
