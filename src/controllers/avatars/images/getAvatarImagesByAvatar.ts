import { AvatarImage } from "../../../models/avatarImage";

export async function getAvatarImagesByAvatar(database: D1Database, avatar: string): Promise<AvatarImage[] | null> {
    return (await database.prepare("SELECT color_type AS colorType, avatar_images.* FROM avatar_images WHERE avatar = ?").bind(avatar).all<AvatarImage>()).results ?? null;
};
