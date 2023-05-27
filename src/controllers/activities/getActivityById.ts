import { Activity } from "../../models/activity";

export async function getActivityById(database: D1Database, id: string): Promise<Activity> {
    return await database.prepare("SELECT * FROM activities WHERE id = ?").bind(id).first<Activity>();
};
