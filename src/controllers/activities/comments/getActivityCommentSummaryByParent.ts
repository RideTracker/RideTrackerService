import { Activity } from "../../../models/activity";
import { ActivityComment } from "../../../models/activityComment";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivityCommentSummaryByParent(database: D1Database, parent: string): Promise<ActivityComment | null> {
    return await database.prepare("SELECT *, COUNT(activity_comments.id) AS count FROM activity_comments WHERE parent = ?").bind(parent).first();
};
