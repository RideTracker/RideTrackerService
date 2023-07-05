import { UserAvatar } from "../../../models/userAvatar";
import { getUserAvatarById } from "./getUserAvatarById";

export async function createUserAvatar(database: D1Database, user: string, image: string): Promise<UserAvatar> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO user_avatars (id, user, image, timestamp) VALUES (?, ?, ?, ?)").bind(id, user, image, timestamp).run();

    return await getUserAvatarById(database, id);
};
