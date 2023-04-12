import { Activity } from "../../../models/activity";
import { ActivitySummary } from "../../../models/activitySummary";
import { BikeSummary } from "../../../models/bikeSummary";

export async function getBikeSummaryById(database: D1Database, id: string): Promise<BikeSummary | null> {
    return await database.prepare("SELECT * FROM bike_summary WHERE id = ?").bind(id).first();
};
