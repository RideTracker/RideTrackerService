import { User } from "../../models/user";

export async function getUserById(database: D1Database, id: string): Promise<User | null> {
    return await database.prepare("SELECT * FROM users WHERE id = ?").bind(id).first();
};
