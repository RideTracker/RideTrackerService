export async function deleteUserFollow(database: D1Database, id: string): Promise<void> {
    await database.prepare("DELETE FROM user_follows WHERE id = ?").bind(id).run();
};
