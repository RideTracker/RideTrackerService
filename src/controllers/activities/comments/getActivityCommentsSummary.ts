import { Activity } from "@ridetracker/ridetrackertypes";
import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { ActivitySummary } from "@ridetracker/ridetrackertypes";
import { DatabaseSource } from "@ridetracker/authservice";

export async function getActivityCommentsSummary(databaseSource: DatabaseSource, activity: string): Promise<(ActivityComment & { comments_count?: number })[]> {
    return await databaseSource.prepare(
        "SELECT c1.*, COUNT(c2.id) AS comments_count FROM activity_comments c1" +
        " LEFT JOIN (SELECT * FROM activity_comments WHERE parent IS NOT NULL) c2 ON c1.id = c2.parent" +
        " WHERE c1.parent IS NULL AND c1.activity = ?" +
        " GROUP BY c1.id ORDER BY MAX(c1.timestamp, COALESCE(c2.timestamp, 0)) DESC LIMIT 2",
        activity).all<ActivityComment & { comments_count?: number }>();
};
