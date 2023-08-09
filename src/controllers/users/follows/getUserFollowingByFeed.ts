import { DatabaseSource } from "@ridetracker/authservice";
import { UserFollow } from "../../../models/userFollow";

export type UserFollowFeedQuery = UserFollow & {
    firstname: string;
    lastname: string;
    avatar: string;
};

export async function getUserFollowingByFeed(databaseSource: DatabaseSource, userId: string, offset: number, limit: number): Promise<UserFollowFeedQuery[]> {
    return await databaseSource.prepare("SELECT user_follows.*, users.firstname, users.lastname, users.avatar FROM user_follows LEFT JOIN users ON users.id = user_follows.follow WHERE user_follows.user = ?1 ORDER BY user_follows.timestamp DESC LIMIT ?3 OFFSET ?2", userId, offset, limit).all<UserFollowFeedQuery>();
};
