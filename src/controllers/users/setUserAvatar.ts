import { DatabaseSource } from "@ridetracker/authservice";

export async function setUserAvatar(databaseSource: DatabaseSource, id: string, avatar: string): Promise<void> {
    await databaseSource.prepare("UPDATE users SET avatar = ? WHERE id = ?", avatar, id).run();
};
