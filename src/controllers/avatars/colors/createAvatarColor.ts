import { AvatarColor } from "../../../models/avatarColor";
import { getAvatarColorById } from "./getAvatarColorById";

export async function createAvatarColor(database: D1Database, avatar: string, type: string, index: number, defaultColor: string | null): Promise<AvatarColor | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO avatar_colors (id, avatar, type, index, default_color, timestamp) VALUES (?, ?, ?, ?, ?, ?)").bind(id, avatar, type, index, defaultColor, timestamp).run();

    return await getAvatarColorById(database, id);
};
