import { DatabaseSource } from "@ridetracker/authservice";

export async function updateActivityPolylines(databaseSource: DatabaseSource, id: string, polylines: string): Promise<void> {
    await databaseSource.prepare("UPDATE activities SET polylines = ? WHERE id = ?", polylines, id).run();
};
