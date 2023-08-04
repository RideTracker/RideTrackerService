import { ActivityLike } from "@ridetracker/ridetrackertypes";

export async function getActivityLikeByUser(database: D1Database, activity: string, user: string): Promise<ActivityLike> {
    return await database.prepare("SELECT * FROM activity_likes WHERE activity = ? AND user = ?").bind(activity, user).first<ActivityLike>();
};
