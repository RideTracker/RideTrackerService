import { Activity } from "@ridetracker/ridetrackertypes";
import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { ActivitySummary } from "@ridetracker/ridetrackertypes";

export async function getActivityCommentSummaryByParent(database: D1Database, parent: string): Promise<ActivityComment> {
    return await database.prepare("SELECT *, COUNT(activity_comments.id) AS count FROM activity_comments WHERE parent = ?").bind(parent).first();
};
