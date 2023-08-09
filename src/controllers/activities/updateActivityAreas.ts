import { Activity } from "@ridetracker/ridetrackertypes";
import { DatabaseSource } from "@ridetracker/authservice";

export async function updateActivityAreas(databaseSource: DatabaseSource, id: string, startArea: string | null, finishArea: string | null): Promise<void> {
    await databaseSource.prepare("UPDATE activities SET start_area = ?, finish_area = ? WHERE id = ?", startArea, finishArea, id).run();
};
