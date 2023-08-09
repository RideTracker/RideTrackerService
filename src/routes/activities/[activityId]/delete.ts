import { getActivityById } from "../../../controllers/activities/getActivityById";
import { deleteActivitySummaries } from "../../../controllers/activities/summary/deleteActivitySummaries";
import { updatePersonalBestActivitySummary } from "../../../controllers/activities/summary/updatePersonalBestActivitySummary";
import { updateActivityStatus } from "../../../controllers/activities/updateActivityStatus";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../../models/FeatureFlagsExecution";

export const activityDeleteRequestSchema = {
    params: {
        activityId: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityDeleteRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { activityId } = request.params;

    const activity = await getActivityById(databaseSource, activityId);

    if(!activity)
        return Response.json({ success: false });

    if(activity.user !== request.key.user)
        return Response.json({ success: false });

    if(activity.status === "deleted")
        return Response.json({ success: false });

    await updateActivityStatus(databaseSource, activity.id, "deleted");

    await env.BUCKET.delete(`activities/${activity.id}.json`);

    await deleteActivitySummaries(databaseSource, activity.id);

    await updatePersonalBestActivitySummary(databaseSource, activity.user);

    return Response.json({ success: true });
};
