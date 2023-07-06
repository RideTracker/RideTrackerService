import { BikeImage } from "../../../models/bikeImage";

export async function createBikeImage(database: D1Database, bike: string, image: string, index: number): Promise<void> {
    const id = crypto.randomUUID();;
    const timestamp = Date.now();

    await database.prepare("INSERT INTO bike_images (id, bike, image, 'index', timestamp) VALUES (?, ?, ?, ?, ?)").bind(id, bike, image, index, timestamp).run();
};
