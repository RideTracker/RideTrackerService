import { Activity } from "../../models/activity";
import { getActivityById } from "./getActivityById";

export async function createActivity(database: D1Database, user: string, title: string | null, description: string | null, bike: string | null, polylines: string | null): Promise<Activity> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO activities (id, user, title, description, bike, polylines, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(id, user, title, description, bike, polylines, "created", timestamp).run();

    return await getActivityById(database, id);
};
