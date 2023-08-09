import { DatabaseSource } from "@ridetracker/authservice";

export async function deleteActivityCommentMessage(databaseSource: DatabaseSource, comment: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM activity_comments WHERE id = ?", comment).run();
};
