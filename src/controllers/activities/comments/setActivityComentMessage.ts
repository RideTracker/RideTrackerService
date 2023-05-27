import { ActivityComment } from "../../../models/activityComment";
import { getActivityCommentById } from "./getActivityCommentById";

export async function setActivityCommentMessage(database: D1Database, comment: string, message: string): Promise<ActivityComment> {
    await database.prepare("UPDATE activity_comments SET message = ? WHERE id = ?").bind(message, comment).run();

    return await getActivityCommentById(database, comment);
};
