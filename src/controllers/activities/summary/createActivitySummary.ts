import { Activity } from "../../../models/activity";
import { ActivitySummary } from "../../../models/activitySummary";
import { getActivitySummaryById } from "./getActivitySummaryById";

export async function createActivitySummary(database: D1Database, id: string, startArea: string | null, finishArea: string | null, distance: number, averageSpeed: number, elevation: number, maxSpeed: number, comments: number): Promise<ActivitySummary | null> {
    const timestamp = Date.now();

    await database.prepare("INSERT INTO activity_summary (id, start_area, finish_area, distance, average_speed, elevation, max_speed, comments, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, startArea, finishArea, distance, averageSpeed, elevation, maxSpeed, comments, timestamp).run();

    return await getActivitySummaryById(database, id);
};
