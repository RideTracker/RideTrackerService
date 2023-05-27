import { UserAvatar } from "../../../models/userAvatar";

export async function getUserAvatarByUser(database: D1Database, user: string): Promise<UserAvatar> {
    return await database.prepare("SELECT * FROM user_avatars WHERE user = ?").bind(user).first();
};
