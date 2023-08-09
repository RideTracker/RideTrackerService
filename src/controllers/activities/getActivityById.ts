import { Activity } from "@ridetracker/ridetrackertypes";
import DatabaseSource from "../../database/databaseSource";

export async function getActivityById(databaseSource: DatabaseSource, id: string): Promise<Activity> {
    return await databaseSource.prepare("SELECT start_area AS startArea, finish_area AS finishArea, local_id AS localId, activities.* FROM activities WHERE id = ?", id).first<Activity>();
};
