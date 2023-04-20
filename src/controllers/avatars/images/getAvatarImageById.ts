import { AvatarImage } from "../../../models/avatarImage";

export async function getAvatarImageById(database: D1Database, id: string): Promise<AvatarImage | null> {
    return await database.prepare("SELECT color_type AS colorType, avatar_images.* FROM avatar_images WHERE id = ?").bind(id).first<AvatarImage>();
};
