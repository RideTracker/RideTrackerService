import { getActivityById } from "../../controllers/activities/getActivityById";
import { getActivitySummaryById } from "../../controllers/activities/summary/getActivitySummaryById";

export const activityRequestSchema = {
    params: {
        id: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityRequest(request: any, env: Env) {
    const { id } = request.params;

    const activity = await getActivityById(env.DATABASE, id);

    if(!activity)
        return Response.json({ success: false });

    const activitySummary = await getActivitySummaryById(env.DATABASE, id);

    return Response.json({
        success: true,

        activity: {
            id: activity.id,
            
            summary: activitySummary && {
                area: activitySummary.area,
                distance: activitySummary.distance,
                averageSpeed: activitySummary.averageSpeed,
                elevation: activitySummary.elevation,
                maxSpeed: activitySummary.maxSpeed,
                comments: activitySummary.comments
            },

            timestamp: activity.timestamp
        }
    });
};
