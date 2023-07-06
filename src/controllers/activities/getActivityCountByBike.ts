export async function getActivityCountByBike(database: D1Database, bikeId: string): Promise<number> {
    return await database.prepare("SELECT COUNT(*) AS count FROM activities WHERE bike = ?").bind(bikeId).first<number>("count");
};
