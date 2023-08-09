import { DatabaseSource } from "@ridetracker/authservice";
import { UserFollow } from "../../../models/userFollow";

export async function getUserFollowById(databaseSource: DatabaseSource, id: string): Promise<UserFollow> {
    return await databaseSource.prepare("SELECT * FROM user_follows WHERE id = ?", id).first();
};
