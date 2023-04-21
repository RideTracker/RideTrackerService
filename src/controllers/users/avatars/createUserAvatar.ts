import { UserAvatar } from "../../../models/userAvatar";
import { getUserAvatarById } from "./getUserAvatarById";

export async function createUserAvatar(database: D1Database, user: string, image: string, combination: string): Promise<UserAvatar | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO user_avatars (id, user, image, combination, timestamp) VALUES (?, ?, ?, ?, ?)").bind(id, user, image, combination, timestamp).run();

    return await getUserAvatarById(database, id);
};
