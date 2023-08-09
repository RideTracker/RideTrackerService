import { DatabaseSource } from "@ridetracker/authservice";
import { UserAvatar } from "../../../models/userAvatar";

export async function getUserAvatarsByUser(databaseSource: DatabaseSource, user: string): Promise<UserAvatar[]> {
    return await databaseSource.prepare("SELECT * FROM user_avatars WHERE user = ? ORDER BY timestamp DESC", user).all<UserAvatar>();
};
