import { UserFollow } from "../../../models/userFollow";

export async function hasUserFollow(database: D1Database, user: string, follow: string): Promise<boolean> {
    return await database.prepare("SELECT COUNT(id) AS count FROM user_follows WHERE user = ? AND follow = ?").bind(user, follow).first<number>("count") !== 0;
};
