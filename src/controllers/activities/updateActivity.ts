import { ActivityVisibility } from "@ridetracker/ridetrackertypes";
import DatabaseSource from "../../database/databaseSource";

export async function updateActivity(databaseSource: DatabaseSource, activityId: string, visibility: ActivityVisibility, title: string | null, description: string | null, bike: string | null): Promise<void> {
    await databaseSource.prepare("UPDATE activities SET visibility = ?, title = ?, description = ?, bike = ? WHERE id = ?", visibility, title, description, bike, activityId).run();
};
