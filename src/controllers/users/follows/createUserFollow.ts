import { User } from "../../../models/user";
import { UserFollow } from "../../../models/userFollow";
import { getUserById } from "./../getUserById";
import { getUserFollowById } from "./getUserFollowById";

export async function createUserFollow(database: D1Database, user: string, follow: string): Promise<UserFollow | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO user_follows (id, user, follow, timestamp) VALUES (?, ?, ?, ?)").bind(id, user, follow, timestamp).run();

    return await getUserFollowById(database, id);
};
