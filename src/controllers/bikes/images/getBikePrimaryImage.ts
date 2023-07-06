import { BikeImage } from "../../../models/bikeImage";

export async function getBikePrimaryImage(database: D1Database, id: string): Promise<BikeImage> {
    return await database.prepare("SELECT * FROM bike_images WHERE bike = ? ORDER BY 'index' ASC LIMIT 1").bind(id).first();
};
