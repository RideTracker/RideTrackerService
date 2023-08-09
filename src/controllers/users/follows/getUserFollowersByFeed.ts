import DatabaseSource from "../../../database/databaseSource";
import { UserFollow } from "../../../models/userFollow";

export type UserFollowersFeedQuery = UserFollow & {
    firstname: string;
    lastname: string;
    avatar: string;
    followsBack: number;
};

export async function getUserFollowersByFeed(databaseSource: DatabaseSource, userId: string, offset: number, limit: number): Promise<UserFollowersFeedQuery[]> {
    return await databaseSource.prepare("SELECT user_follows.*, users.firstname, users.lastname, users.avatar, (user_following.id IS NOT NULL) AS followsBack FROM user_follows INNER JOIN users ON users.id = user_follows.user LEFT JOIN user_follows AS user_following ON user_following.user = ?1 AND user_following.follow = user_follows.user WHERE user_follows.follow = ?1 ORDER BY user_follows.timestamp DESC LIMIT ?3 OFFSET ?2", userId, offset, limit).all<UserFollowersFeedQuery>();
};
