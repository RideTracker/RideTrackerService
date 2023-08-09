import { DatabaseSource } from "@ridetracker/authservice";

export async function deleteUserFollow(databaseSource: DatabaseSource, id: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM user_follows WHERE id = ?", id).run();
};
