import { getActivityById } from "../../../controllers/activities/getActivityById";
import { getActivitySummaryById } from "../../../controllers/activities/summary/getActivitySummaryById";

export const activitySummaryRequestSchema = {
    params: {
        activityId: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivitySummaryRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>) {
    const { activityId } = request.params;

    const activity = await getActivityById(env.DATABASE, activityId);

    if(!activity)
        return Response.json({ success: false });

    let activitySummary = await getActivitySummaryById(env.DATABASE, activity.id);

    if(!activitySummary) {
        const durableObjectId = env.ACTIVITY_DURABLE_OBJECT.idFromName("default");
        const durableObject = env.ACTIVITY_DURABLE_OBJECT.get(durableObjectId);

        context.waitUntil(durableObject.fetch(request.url, {
            method: "POST",
            body: JSON.stringify({
                activityId: activity.id
            })
        }));

        return Response.json({
            success: true
        }, {
            status: 102,
            statusText: "Processing"
        });
    }

    return Response.json({
        success: true,

        activitySummary: {
            startArea: activitySummary.startArea,
            finishArea: activitySummary.finishArea,

            distance: Math.round((activitySummary.distance / 1000) * 10) / 10,
            distancePersonalBest: (activitySummary.distancePersonalBest) && activitySummary.distancePersonalBest,

            averageSpeed: Math.round((activitySummary.averageSpeed * 3.6) * 10) / 10,
            averageSpeedPersonalBest: (activitySummary.averageSpeedPersonalBest) && activitySummary.averageSpeedPersonalBest,

            elevation: Math.round(activitySummary.elevation),
            elevationPersonalBest: (activitySummary.elevationPersonalBest) && activitySummary.elevationPersonalBest,

            maxSpeed: Math.round((activitySummary.maxSpeed * 3.6) * 10) / 10,
            maxSpeedPersonalBest: (activitySummary.maxSpeedPersonalBest) && activitySummary.maxSpeedPersonalBest
        }
    });
};
