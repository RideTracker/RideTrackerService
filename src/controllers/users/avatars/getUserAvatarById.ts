import { UserAvatar } from "../../../models/userAvatar";

export async function getUserAvatarById(database: D1Database, id: string): Promise<UserAvatar> {
    return await database.prepare("SELECT * FROM user_avatars WHERE id = ?").bind(id).first();
};
