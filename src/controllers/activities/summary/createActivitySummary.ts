import { ActivitySummary } from "../../../models/activitySummary";
import { getActivitySummaryById } from "./getActivitySummaryById";

export async function createActivitySummary(database: D1Database, id: string, startArea: string | null, finishArea: string | null, distance: number, distancePersonalBest: boolean | null, averageSpeed: number, averageSpeedPersonalBest: boolean | null, elevation: number, elevationPersonalBest: boolean | null, maxSpeed: number, maxSpeedPersonalBest: boolean | null): Promise<ActivitySummary> {
    const timestamp = Date.now();

    await database.prepare("INSERT INTO activity_summary (id, start_area, finish_area, distance, distance_personal_best, average_speed, average_speed_personal_best, elevation, elevation_personal_best, max_speed, max_speed_personal_best, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, startArea, finishArea, distance, distancePersonalBest, averageSpeed, averageSpeedPersonalBest, elevation, elevationPersonalBest, maxSpeed, maxSpeedPersonalBest, timestamp).run();

    return await getActivitySummaryById(database, id);
};
