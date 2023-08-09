import { Activity } from "@ridetracker/ridetrackertypes";
import DatabaseSource from "../../database/databaseSource";

export async function updateActivityStatus(databaseSource: DatabaseSource, id: string, status: Activity["status"]): Promise<void> {
    await databaseSource.prepare("UPDATE activities SET status = ? WHERE id = ?", status, id).run();
};
