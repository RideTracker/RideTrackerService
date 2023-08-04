import { Activity } from "@ridetracker/ridetrackertypes";

export async function updateActivityStatus(database: D1Database, id: string, status: Activity["status"]): Promise<void> {
    await database.prepare("UPDATE activities SET status = ? WHERE id = ?").bind(status, id).run();
};
