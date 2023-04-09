import { User } from "../../../models/user";
import { UserKey } from "../../../models/userKey";

export async function createUserKey(database: D1Database, user: User): Promise<UserKey> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO user_keys (id, user, timestamp) VALUES (?, ?, ?)").bind(id, user.id, timestamp).run();
    
    return {
        id,
        user: user.id,
        timestamp
    };
};
