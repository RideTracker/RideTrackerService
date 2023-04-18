import { AvatarColor } from "../../../models/avatarColor";

export async function getAvatarColorById(database: D1Database, id: string): Promise<AvatarColor | null> {
    return await database.prepare("SELECT default_color AS defaultColor, avatar_colors.* FROM avatar_colors WHERE id = ?").bind(id).first<AvatarColor>();
};
