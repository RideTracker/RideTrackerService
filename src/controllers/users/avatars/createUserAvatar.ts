import DatabaseSource from "../../../database/databaseSource";
import { UserAvatar } from "../../../models/userAvatar";
import { getUserAvatarById } from "./getUserAvatarById";

export async function createUserAvatar(databaseSource: DatabaseSource, user: string, image: string): Promise<UserAvatar> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO user_avatars (id, user, image, timestamp) VALUES (?, ?, ?, ?) RETURNING *", id, user, image, timestamp).first<UserAvatar>();
};
