import { Activity, ActivityVisibility } from "@ridetracker/ridetrackertypes";
import DatabaseSource from "../../database/databaseSource";

export async function createActivity(databaseSource: DatabaseSource, user: string, visibility: ActivityVisibility, localId: string): Promise<Activity> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO activities (id, user, visibility, status, local_id, timestamp) VALUES (?, ?, ?, ?, ?, ?) RETURNING *", id, user, visibility, "created", localId, timestamp).first();
};
