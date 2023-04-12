import { getActivityById } from "../../controllers/activities/getActivityById";

export async function handleActivityRequest(request: any, env: Env) {
    const { id } = request.params;

    const activity = await getActivityById(env.DATABASE, id);

    if(!activity)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        activity: {
            id: activity.id,

            timestamp: activity.timestamp
        }
    });
};
