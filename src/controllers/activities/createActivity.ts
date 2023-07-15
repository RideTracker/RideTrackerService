import { ActivityVisibility } from "../../models/ActivityVisibility";
import { Activity } from "../../models/activity";
import { getActivityById } from "./getActivityById";

export async function createActivity(database: D1Database, user: string, visibility: ActivityVisibility): Promise<Activity> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO activities (id, user, visibility, status, timestamp) VALUES (?, ?, ?, ?, ?)").bind(id, user, visibility, "created", timestamp).run();

    return await getActivityById(database, id);
};
