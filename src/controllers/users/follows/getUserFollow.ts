import { UserFollow } from "../../../models/userFollow";

export async function getUserFollow(database: D1Database, user: string, follow: string): Promise<UserFollow | null> {
    return await database.prepare("SELECT * FROM user_follows WHERE user = ? AND follow = ?").bind(user, follow).first();
};
