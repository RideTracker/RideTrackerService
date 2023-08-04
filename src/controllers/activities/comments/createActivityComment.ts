import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { getActivityCommentById } from "./getActivityCommentById";

export async function createActivityComment(database: D1Database, activity: string, user: string, parent: string | null, message: string): Promise<ActivityComment> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO activity_comments (id, activity, user, parent, message, timestamp) VALUES (?, ?, ?, ?, ?, ?)").bind(id, activity, user, parent, message, timestamp).run();

    return await getActivityCommentById(database, id);
};
