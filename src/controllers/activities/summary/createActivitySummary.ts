import { DatabaseSource } from "@ridetracker/authservice";

export async function createActivitySummary(databaseSource: DatabaseSource, id: string, key: string, value: number): Promise<void> {
    const timestamp = Date.now();

    await databaseSource.prepare("INSERT INTO activity_summary (id, key, value, personal_best, timestamp) VALUES (?, ?, ?, ?, ?)", id, key, value, 0, timestamp).run();
};
