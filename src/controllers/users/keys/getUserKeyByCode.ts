import { User } from "../../../models/user";
import { UserKey } from "../../../models/userKey";

export async function getUserKeyByCode(database: D1Database, code: string): Promise<UserKey> {
    return await database.prepare("SELECT * FROM user_keys WHERE id = ?").bind(code).first();
};
