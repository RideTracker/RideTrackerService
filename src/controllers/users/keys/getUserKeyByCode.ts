import { User } from "../../../models/user";
import { UserKey } from "../../../models/userKey";

export async function getUserKeyByCode(database: D1Database, user: User, code: string): Promise<UserKey> {
    return await database.prepare("SELECT * FROM user_keys WHERE user = ? AND code = ?").bind(user.id, code).first();
};
