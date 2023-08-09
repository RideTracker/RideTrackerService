import { ActivityLike } from "@ridetracker/ridetrackertypes";
import DatabaseSource from "../../../database/databaseSource";

export async function getActivityLikeByUser(databaseSource: DatabaseSource, activity: string, user: string): Promise<ActivityLike> {
    return await databaseSource.prepare("SELECT * FROM activity_likes WHERE activity = ? AND user = ?", activity, user).first<ActivityLike>();
};
