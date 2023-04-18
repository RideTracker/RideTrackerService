import { Avatar } from "../../models/avatar";

export async function deleteAvatarById(database: D1Database, id: string): Promise<void> {
    await database.prepare("DELETE FROM avatar_colors WHERE avatar = ?").bind(id).run();
    await database.prepare("DELETE FROM avatar_images WHERE avatar = ?").bind(id).run();
    await database.prepare("DELETE FROM avatars WHERE id = ?").bind(id).run();
};
