import { getActivities } from "../controllers/activities/getActivities";
import { getActivitiesByFeed } from "../controllers/activities/getActivitiesByFeed";

const feedRequestSchema = {
    params: {
        search: {
            type: "string",
            required: false
        },
        
        order: {
            type: "string",
            required: false
        },
        
        timeline: {
            type: "string",
            required: false
        }
    }  
};

export async function handleFeedRequest(request: Request, env: Env) {
    const { search, order, timeline } = request.params;

    const activities = await getActivitiesByFeed(env.DATABASE, search, order, timeline);

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
