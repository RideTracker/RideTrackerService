import { BikeImage } from "../../../models/bikeImage";

export async function getBikeImageById(database: D1Database, id: string): Promise<BikeImage> {
    return await database.prepare("SELECT * FROM bike_images WHERE id = ? ORDER BY 'index' ASC LIMIT 1").bind(id).first();
};
