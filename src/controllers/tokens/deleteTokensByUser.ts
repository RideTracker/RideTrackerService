import { DatabaseSource } from "@ridetracker/authservice";

export async function deleteTokensByUser(databaseSource: DatabaseSource, user: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM tokens WHERE user = ?", user).run();
};
