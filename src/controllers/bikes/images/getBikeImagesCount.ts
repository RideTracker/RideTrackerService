export async function getBikeImagesCount(database: D1Database, bike: string): Promise<number> {
    return await database.prepare("SELECT COUNT(*) AS count FROM bike_images WHERE bike = ?").bind(bike).first("count");
};
