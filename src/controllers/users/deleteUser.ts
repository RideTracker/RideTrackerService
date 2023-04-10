import { User } from "../../models/user";

export async function deleteUser(database: D1Database, user: User): Promise<void> {
    await database.prepare("DELETE FROM user_keys WHERE user = ?").bind(user.id).run();
    await database.prepare("DELETE FROM user_verifications WHERE user = ?").bind(user.id).run();
    await database.prepare("DELETE FROM users WHERE id = ?").bind(user.id).run();
};
