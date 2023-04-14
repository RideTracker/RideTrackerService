import { BikeImage } from "../../../models/bikeImage";
import { getBikeImageById } from "./getBikeImageById";

export async function createBikeImage(database: D1Database, bike: string, image: string): Promise<BikeImage | null> {
    const timestamp = Date.now();

    await database.prepare("INSERT INTO bike_images (id, bike, timestamp) VALUES (?, ?, ?)").bind(image, bike, timestamp).run();

    return await getBikeImageById(database, image);
};
