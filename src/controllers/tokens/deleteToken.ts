import { DatabaseSource } from "@ridetracker/authservice";

export async function deleteToken(databaseSource: DatabaseSource, id: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM tokens WHERE id = ?", id).run();
};
