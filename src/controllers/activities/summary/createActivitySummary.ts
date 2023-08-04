import { ActivitySummary } from "@ridetracker/ridetrackertypes";

export async function createActivitySummary(database: D1Database, id: string, key: string, value: number): Promise<void> {
    const timestamp = Date.now();

    await database.prepare("INSERT INTO activity_summary (id, key, value, personal_best, timestamp) VALUES (?, ?, ?, ?, ?)").bind(id, key, value, 0, timestamp).run();
};
