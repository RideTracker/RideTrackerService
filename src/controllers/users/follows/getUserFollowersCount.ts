import DatabaseSource from "../../../database/databaseSource";

export async function getUserFollowersCount(databaseSource: DatabaseSource, user: string): Promise<number> {
    return await databaseSource.prepare("SELECT COUNT(*) AS count FROM user_follows WHERE follow = ?", user).first("count");
};
