import { DatabaseSource } from "@ridetracker/authservice";

export async function getBikeImagesCount(databaseSource: DatabaseSource, bike: string): Promise<number> {
    return await databaseSource.prepare("SELECT COUNT(*) AS count FROM bike_images WHERE bike = ?", bike).first("count");
};
