export async function setUserAvatar(database: D1Database, id: string, avatar: string): Promise<void> {
    await database.prepare("UPDATE users SET avatar = ? WHERE id = ?").bind(avatar, id).run();
};
