import { User } from "../../models/user";

export async function deleteUser(database: D1Database, user: User): Promise<void> {
    await database.batch([
        database.prepare("DELETE FROM user_keys WHERE user = ?").bind(user.id),
        database.prepare("DELETE FROM user_verifications WHERE user = ?").bind(user.id),
        database.prepare("DELETE FROM users WHERE id = ?").bind(user.id)
    ]);
};
