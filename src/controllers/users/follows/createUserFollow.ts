import DatabaseSource from "../../../database/databaseSource";
import { User } from "../../../models/user";
import { UserFollow } from "../../../models/userFollow";
import { getUserById } from "./../getUserById";
import { getUserFollowById } from "./getUserFollowById";

export async function createUserFollow(databaseSource: DatabaseSource, user: string, follow: string): Promise<UserFollow> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO user_follows (id, user, follow, timestamp) VALUES (?, ?, ?, ?) RETURNING *", id, user, follow, timestamp).first<UserFollow>();
};
