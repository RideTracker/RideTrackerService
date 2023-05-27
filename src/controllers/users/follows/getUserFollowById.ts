import { UserFollow } from "../../../models/userFollow";

export async function getUserFollowById(database: D1Database, id: string): Promise<UserFollow> {
    return await database.prepare("SELECT * FROM user_follows WHERE id = ?").bind(id).first();
};
