import { AvatarColor } from "../../../models/avatarColor";

export async function getAvatarColors(database: D1Database): Promise<AvatarColor[] | null> {
    return (await database.prepare("SELECT default_color AS defaultColor, avatar_colors.* FROM avatar_colors").all<AvatarColor>()).results ?? null;
};
