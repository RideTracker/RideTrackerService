import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { getActivityCommentById } from "./getActivityCommentById";
import DatabaseSource from "../../../database/databaseSource";

export async function setActivityCommentMessage(databaseSource: DatabaseSource, comment: string, message: string): Promise<ActivityComment> {
    return await databaseSource.prepare("UPDATE activity_comments SET message = ? WHERE id = ? RETURNING *", message, comment).first<ActivityComment>();
};
