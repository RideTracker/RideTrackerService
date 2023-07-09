export async function deleteTokensByUser(database: D1Database, user: string): Promise<void> {
    await database.prepare("DELETE FROM tokens WHERE user = ?").bind(user).run();
};
