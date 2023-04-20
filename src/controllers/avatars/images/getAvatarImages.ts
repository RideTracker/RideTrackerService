import { AvatarImage } from "../../../models/avatarImage";

export async function getAvatarImages(database: D1Database): Promise<AvatarImage[] | null> {
    return (await database.prepare("SELECT color_type AS colorType, avatar_images.* FROM avatar_images").all<AvatarImage>()).results ?? null;
};
