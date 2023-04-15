import { UserAvatar } from "../../../models/userAvatar";

export async function getUserAvatarById(database: D1Database, id: string): Promise<UserAvatar | null> {
    return await database.prepare("SELECT * FROM user_avatars WHERE id = ?").bind(id).first();
};
