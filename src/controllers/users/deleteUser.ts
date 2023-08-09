import { DatabaseSource } from "@ridetracker/authservice";
import { User } from "../../models/user";

export async function deleteUser(databaseSource: DatabaseSource, user: User): Promise<void> {
    await databaseSource.batch([
        databaseSource.prepare("DELETE FROM user_keys WHERE user = ?", user.id),
        databaseSource.prepare("DELETE FROM user_verifications WHERE user = ?", user.id),
        databaseSource.prepare("DELETE FROM users WHERE id = ?", user.id)
    ]);
};
