import { ActivityVisibility } from "../../models/ActivityVisibility";

export async function updateActivity(database: D1Database, activityId: string, visibility: ActivityVisibility, title: string | null, description: string | null, bike: string | null): Promise<void> {
    await database.prepare("UPDATE activities SET visibility = ?, title = ?, description = ?, bike = ? WHERE id = ?").bind(visibility, title, description, bike, activityId).run();
};
