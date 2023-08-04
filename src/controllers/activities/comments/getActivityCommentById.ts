import { Activity } from "@ridetracker/ridetrackertypes";
import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { ActivitySummary } from "@ridetracker/ridetrackertypes";

export async function getActivityCommentById(database: D1Database, id: string): Promise<ActivityComment> {
    return await database.prepare("SELECT * FROM activity_comments WHERE id = ?").bind(id).first();
};
