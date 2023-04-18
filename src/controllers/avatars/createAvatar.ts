import { Avatar } from "../../models/avatar";
import { getAvatarById } from "./getAvatarById";

export async function createAvatar(database: D1Database, id: string, name: string, type: string, image: string, timestamp: number): Promise<Avatar | null> {
    await database.prepare("INSERT INTO avatars (id, name, type, image, timestamp) VALUES (?, ?, ?, ?, ?)").bind(id, name, type, image, timestamp).run();

    return await getAvatarById(database, id);
};
