export async function getBikeModel(database: D1Database, bikeId: string): Promise<string> {
    return await database.prepare("SELECT model FROM bikes WHERE id = ?").bind(bikeId).first<string>("model");
};
