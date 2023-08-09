import DatabaseSource from "../../../database/databaseSource";
import { BikeImage } from "../../../models/bikeImage";

export async function getBikePrimaryImage(databaseSource: DatabaseSource, id: string): Promise<BikeImage> {
    return await databaseSource.prepare("SELECT * FROM bike_images WHERE bike = ? ORDER BY 'index' ASC LIMIT 1", id).first();
};
