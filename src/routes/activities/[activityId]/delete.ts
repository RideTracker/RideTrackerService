import { getActivityById } from "../../../controllers/activities/getActivityById";
import { deleteActivitySummaries } from "../../../controllers/activities/summary/deleteActivitySummaries";
import { updatePersonalBestActivitySummary } from "../../../controllers/activities/summary/updatePersonalBestActivitySummary";
import { updateActivityStatus } from "../../../controllers/activities/updateActivityStatus";

export const activityDeleteRequestSchema = {
    params: {
        activityId: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityDeleteRequest(request: RequestWithKey, env: Env) {
    const { activityId } = request.params;

    const activity = await getActivityById(env.DATABASE, activityId);

    if(!activity)
        return Response.json({ success: false });

    if(activity.user !== request.key.user)
        return Response.json({ success: false });

    if(activity.status === "deleted")
        return Response.json({ success: false });

    await updateActivityStatus(env.DATABASE, activity.id, "deleted");

    await env.BUCKET.delete(`activities/${activity.id}.json`);

    await deleteActivitySummaries(env.DATABASE, activity.id);

    await updatePersonalBestActivitySummary(env.DATABASE, activity.user);

    return Response.json({ success: true });
};
