import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { DatabaseSource } from "@ridetracker/authservice";

export async function getLatestActivityComment(databaseSource: DatabaseSource, activity: string): Promise<ActivityComment> {
    return await databaseSource.prepare("SELECT * FROM activity_comments WHERE activity = ? ORDER BY timestamp DESC LIMIT 1", activity).first();
};
