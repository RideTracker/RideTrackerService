import { Activity } from "../../../models/activity";
import { ActivityComment } from "../../../models/activityComment";
import { ActivitySummary } from "../../../models/activitySummary";

export async function getActivityComments(database: D1Database, activity: string): Promise<ActivityComment[] | null> {
    const { results } = await database.prepare("SELECT * FROM activity_comments WHERE activity = ?").bind(activity).all();

    if(!results)
        return null;

    return results as ActivityComment[];
};
