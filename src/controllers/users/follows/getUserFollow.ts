import { DatabaseSource } from "@ridetracker/authservice";
import { UserFollow } from "../../../models/userFollow";

export async function getUserFollow(databaseSource: DatabaseSource, user: string, follow: string): Promise<UserFollow | null> {
    return await databaseSource.prepare("SELECT * FROM user_follows WHERE user = ? AND follow = ?", user, follow).first();
};
