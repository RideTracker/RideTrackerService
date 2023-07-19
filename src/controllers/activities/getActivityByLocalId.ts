import { Activity } from "../../models/activity";

export async function getActivityByLocalId(database: D1Database, userId: string, localId: string): Promise<Activity | null> {
    return await database.prepare("SELECT start_area AS startArea, finish_area AS finishArea, local_id AS localId, activities.* FROM activities WHERE user = ? AND local_id = ?").bind(userId, localId).first<Activity | null>();
};
