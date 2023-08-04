import { Activity } from "@ridetracker/ridetrackertypes";
import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { ActivitySummary } from "@ridetracker/ridetrackertypes";

export async function getActivityComments(database: D1Database, activity: string): Promise<ActivityComment[]> {
    return (await database.prepare("SELECT * FROM activity_comments WHERE activity = ? ORDER BY timestamp DESC").bind(activity).all<ActivityComment>()).results ?? [];
};
