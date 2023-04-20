import { AvatarImage } from "../../../models/avatarImage";
import { getAvatarImageById } from "./getAvatarImageById";

export async function createAvatarImage(database: D1Database, avatar: string, image: string, index: number, colorType: number | null): Promise<AvatarImage | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO avatar_images (id, avatar, image, `index`, color_type, timestamp) VALUES (?, ?, ?, ?, ?, ?)").bind(id, avatar, image, index, colorType, timestamp).run();

    return await getAvatarImageById(database, id);
};
