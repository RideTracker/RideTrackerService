import { Activity } from "@ridetracker/ridetrackertypes";
import DatabaseSource from "../../database/databaseSource";

export async function getActivityByLocalId(databaseSource: DatabaseSource, userId: string, localId: string): Promise<Activity | null> {
    return await databaseSource.prepare("SELECT start_area AS startArea, finish_area AS finishArea, local_id AS localId, activities.* FROM activities WHERE user = ? AND local_id = ?", userId, localId).first<Activity | null>();
};
