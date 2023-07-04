import { Activity } from "../../models/activity";

export async function updateActivityAreas(database: D1Database, id: string, startArea: string | null, finishArea: string | null): Promise<Activity> {
    return await database.prepare("UPDATE activities SET start_area = ?, finish_area = ? WHERE id = ? RETURNING *").bind(startArea, finishArea, id).first<Activity>();
};
