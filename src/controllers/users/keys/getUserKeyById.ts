import { User } from "../../../models/user";
import { UserKey } from "../../../models/userKey";

export async function getUserKeyById(database: D1Database, id: string): Promise<UserKey | null> {
    return await database.prepare("SELECT * FROM user_keys WHERE id = ?").bind(id).first();
};
