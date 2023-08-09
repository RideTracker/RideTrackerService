import { ActivityComment } from "@ridetracker/ridetrackertypes";
import { DatabaseSource } from "@ridetracker/authservice";

export async function getActivityCommentById(databaseSource: DatabaseSource, id: string): Promise<ActivityComment> {
    return await databaseSource.prepare("SELECT * FROM activity_comments WHERE id = ?", id).first();
};
