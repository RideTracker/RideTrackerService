import { UserAvatar } from "../../../models/userAvatar";

export async function getUserAvatarsByUser(database: D1Database, user: string): Promise<UserAvatar[]> {
    return (await database.prepare("SELECT * FROM user_avatars WHERE user = ? ORDER BY timestamp DESC").bind(user).all<UserAvatar>()).results ?? [];
};
