import { User } from "../../models/user";

export async function getUsersById(database: D1Database, ids: string[]): Promise<User[]> {
    return (await database.prepare("SELECT * FROM users WHERE id IN (SELECT value FROM json_each(?1))").bind(JSON.stringify(ids)).all<User>()).results ?? [];
};
