import DatabaseSource from "../../../database/databaseSource";
import { BikeImage } from "../../../models/bikeImage";

export async function createBikeImage(databaseSource: DatabaseSource, bike: string, image: string, index: number): Promise<BikeImage> {
    const id = crypto.randomUUID();;
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO bike_images (id, bike, image, 'index', timestamp) VALUES (?, ?, ?, ?, ?) RETURNING *", id, bike, image, index, timestamp).first<BikeImage>();
};
