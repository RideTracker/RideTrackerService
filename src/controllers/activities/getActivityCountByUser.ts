import { DatabaseSource } from "@ridetracker/authservice";

export async function getActivityCountByUser(databaseSource: DatabaseSource, user: string): Promise<number> {
    return await databaseSource.prepare("SELECT COUNT(*) AS count FROM activities WHERE user = ?", user).first<number>("count");
};
