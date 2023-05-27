import { Activity } from "../../../models/activity";
import { ActivityComment } from "../../../models/activityComment";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivityCommentsSummary(database: D1Database, activity: string): Promise<(ActivityComment & { comments_count?: number })[]> {
    return (await database.prepare(
        "SELECT c1.*, COUNT(c2.id) AS comments_count FROM activity_comments c1" +
        " LEFT JOIN (SELECT * FROM activity_comments WHERE parent IS NOT NULL) c2 ON c1.id = c2.parent" +
        " WHERE c1.parent IS NULL AND c1.activity = ?" +
        " GROUP BY c1.id ORDER BY MAX(c1.timestamp, COALESCE(c2.timestamp, 0)) DESC LIMIT 2"
        ).bind(activity).all<ActivityComment & { comments_count?: number }>()).results ?? [];
};
