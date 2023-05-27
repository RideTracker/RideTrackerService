import { User } from "../../models/user";

export async function getUserByEmail(database: D1Database, email: string): Promise<User> {
    return await database.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
};
