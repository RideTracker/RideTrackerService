import { UserAvatar } from "../../../models/userAvatar";

export async function getUserAvatarsByUser(database: D1Database, user: string): Promise<UserAvatar[] | null> {
    return (await database.prepare("SELECT * FROM user_avatars WHERE user = ? ORDER BY timestamp DESC").bind(user).all<UserAvatar>()).results ?? null;
};
