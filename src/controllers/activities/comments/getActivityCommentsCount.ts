import { DatabaseSource } from "@ridetracker/authservice";

export async function getActivityCommentsCount(databaseSource: DatabaseSource, activity: string): Promise<number> {
    return await databaseSource.prepare("SELECT COUNT(*) AS count FROM activity_comments WHERE activity = ?", activity).first<number>("count");
};
