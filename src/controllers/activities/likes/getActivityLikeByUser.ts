import { Activity } from "../../../models/activity";
import { ActivityLike } from "../../../models/activityLike";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivityLikeByUser(database: D1Database, activity: string, user: string): Promise<ActivityLike | null> {
    return await database.prepare("SELECT * FROM activity_likes WHERE activity = ? AND user = ?").bind(activity, user).first();
    
};
