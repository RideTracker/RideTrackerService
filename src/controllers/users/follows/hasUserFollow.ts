import { DatabaseSource } from "@ridetracker/authservice";
import { UserFollow } from "../../../models/userFollow";

export async function hasUserFollow(databaseSource: DatabaseSource, user: string, follow: string): Promise<boolean> {
    return await databaseSource.prepare("SELECT COUNT(id) AS count FROM user_follows WHERE user = ? AND follow = ?", user, follow).first<number>("count") !== 0;
};
