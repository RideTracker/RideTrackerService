import { User } from "../../../models/user";
import { UserKey } from "../../../models/userKey";

export async function deleteUserKey(database: D1Database, userKey: UserKey): Promise<void> {
    await database.prepare("DELETE FROM user_keys WHERE id = ?").bind(userKey.id).run();
};
