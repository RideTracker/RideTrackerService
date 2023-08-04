import { Activity, ActivityVisibility } from "@ridetracker/ridetrackertypes";
import { getActivityById } from "./getActivityById";

export async function createActivity(database: D1Database, user: string, visibility: ActivityVisibility, localId: string): Promise<Activity> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO activities (id, user, visibility, status, local_id, timestamp) VALUES (?, ?, ?, ?, ?, ?)").bind(id, user, visibility, "created", localId, timestamp).run();

    return await getActivityById(database, id);
};
