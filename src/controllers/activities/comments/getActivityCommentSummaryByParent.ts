import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { DatabaseSource } from "@ridetracker/authservice";

export async function getActivityCommentSummaryByParent(databaseSource: DatabaseSource, parent: string): Promise<ActivityComment> {
    return await databaseSource.prepare("SELECT *, COUNT(activity_comments.id) AS count FROM activity_comments WHERE parent = ?", parent).first();
};
