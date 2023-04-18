import { AvatarImage } from "../../../models/avatarImage";
import { getAvatarImageById } from "./getAvatarImageById";

export async function createAvatarImage(database: D1Database, avatar: string, image: string, index: number, colorIndex: number | null): Promise<AvatarImage | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO avatar_images (id, avatar, image, `index`, color_index, timestamp) VALUES (?, ?, ?, ?, ?, ?)").bind(id, avatar, image, index, colorIndex, timestamp).run();

    return await getAvatarImageById(database, id);
};
