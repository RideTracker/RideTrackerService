import { Activity } from "../../../models/activity";
import { ActivitySummary } from "../../../models/activitySummary";
import { getActivitySummaryById } from "./getActivitySummaryById";

export async function createActivitySummary(database: D1Database, id: string, startArea: string | null, finishArea: string | null, distance: number, averageSpeed: number, elevation: number, maxSpeed: number): Promise<ActivitySummary | null> {
    const timestamp = Date.now();

    await database.prepare("INSERT INTO activity_summary (id, start_area, finish_area, distance, average_speed, elevation, max_speed, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(id, startArea, finishArea, distance, averageSpeed, elevation, maxSpeed, timestamp).run();

    return await getActivitySummaryById(database, id);
};
