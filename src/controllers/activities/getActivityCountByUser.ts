import DatabaseSource from "../../database/databaseSource";

export async function getActivityCountByUser(databaseSource: DatabaseSource, user: string): Promise<number> {
    return await databaseSource.prepare("SELECT COUNT(*) AS count FROM activities WHERE user = ?", user).first<number>("count");
};
