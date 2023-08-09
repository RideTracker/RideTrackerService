import DatabaseSource from "../../../database/databaseSource";
import { UserAvatar } from "../../../models/userAvatar";

export async function getUserAvatarById(databaseSource: DatabaseSource, id: string): Promise<UserAvatar> {
    return await databaseSource.prepare("SELECT * FROM user_avatars WHERE id = ?", id).first();
};
