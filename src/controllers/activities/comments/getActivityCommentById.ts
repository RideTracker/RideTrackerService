import { Activity } from "../../../models/activity";
import { ActivityComment } from "../../../models/activityComment";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivityCommentById(database: D1Database, id: string): Promise<ActivityComment | null> {
    return await database.prepare("SELECT * FROM activity_comments WHERE id = ?").bind(id).first();
};
