import { getActivities } from "../controllers/activities/getActivities";

export async function handleFeedRequest(request: Request, env: Env) {
    const activities = await getActivities(env.DATABASE);

    if(!activities)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        activities: activities.map((activity) => {
            return {
                id: activity.id,

                timestamp: activity.timestamp
            }
        })
    });
};
