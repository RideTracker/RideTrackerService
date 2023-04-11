import { Activity } from "../../models/activity";

export async function getActivities(database: D1Database): Promise<Activity[] | null> {
    const { results } = await database.prepare("SELECT * FROM activities").all();

    if(!results)
        return null;

    return results as Activity[];
};
