import { getActivities } from "../controllers/activities/getActivities";
import { getActivitiesByFeed } from "../controllers/activities/getActivitiesByFeed";

export const feedRequestSchema = {
    query: {
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

export async function handleFeedRequest(request: RequestWithKey, env: Env) {
    const { search, order, timeline, offset } = request.query;

    const activities = await getActivitiesByFeed(env.DATABASE, offset, search, order, timeline);

    if(!activities)
        return new Response(undefined, { status: 404, statusText: "Not Found" })

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
