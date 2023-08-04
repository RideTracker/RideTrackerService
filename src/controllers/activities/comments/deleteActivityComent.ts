import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { getActivityCommentById } from "./getActivityCommentById";

export async function deleteActivityCommentMessage(database: D1Database, comment: string): Promise<void> {
    await database.prepare("DELETE FROM activity_comments WHERE id = ?").bind(comment).run();
};
