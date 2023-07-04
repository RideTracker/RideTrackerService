import { ActivitySummary } from "../../../models/activitySummary";

export async function createActivitySummary(database: D1Database, id: string, key: string, value: number): Promise<ActivitySummary> {
    const timestamp = Date.now();

    return database.prepare("INSERT INTO activity_summary (id, key, value, personal_best, timestamp) VALUES (?, ?, ?, ?, ?) RETURNING *").bind(id, key, value, false, timestamp).first<ActivitySummary>();
};
