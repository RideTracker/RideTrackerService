import { ActivityComment } from "../../../models/activityComment";
import { getActivityCommentById } from "./getActivityCommentById";

export async function createActivityComment(database: D1Database, activity: string, user: string, message: string): Promise<ActivityComment | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO activity_comments (id, activity, user, message, timestamp) VALUES (?, ?, ?, ?, ?)").bind(id, activity, user, message, timestamp).run();

    return await getActivityCommentById(database, id);
};
