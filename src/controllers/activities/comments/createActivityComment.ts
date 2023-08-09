import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { getActivityCommentById } from "./getActivityCommentById";
import DatabaseSource from "../../../database/databaseSource";

export async function createActivityComment(databaseSource: DatabaseSource, activity: string, user: string, parent: string | null, message: string): Promise<ActivityComment> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO activity_comments (id, activity, user, parent, message, timestamp) VALUES (?, ?, ?, ?, ?, ?) RETURNING *", id, activity, user, parent, message, timestamp).first<ActivityComment>();
};
