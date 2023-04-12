import { getActivityById } from "../../controllers/activities/getActivityById";
import { getActivityLikeByUser } from "../../controllers/activities/likes/getActivityLikeByUser";
import { getActivitySummaryById } from "../../controllers/activities/summary/getActivitySummaryById";
import { getUserById } from "../../controllers/users/getUserById";

export const activityRequestSchema = {
    params: {
        id: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityRequest(request: Request, env: Env) {
    const { id } = request.params;

    const activity = await getActivityById(env.DATABASE, id);

    if(!activity)
        return Response.json({ success: false });

    const acitivityAuthor = await getUserById(env.DATABASE, activity.user);

    if(!acitivityAuthor)
        return Response.json({ success: false });

    const activitySummary = await getActivitySummaryById(env.DATABASE, id);
    const activityUserLike = await getActivityLikeByUser(env.DATABASE, id, request.key.user);

    return Response.json({
        success: true,

        activity: {
            id: activity.id,

            author: {
                id: acitivityAuthor.id,
                name: acitivityAuthor.firstname + " " + acitivityAuthor.lastname,
                avatar: acitivityAuthor.avatar
            },
            
            summary: activitySummary && {
                area: activitySummary.area,
                distance: activitySummary.distance,
                averageSpeed: activitySummary.averageSpeed,
                elevation: activitySummary.elevation,
                maxSpeed: activitySummary.maxSpeed,
                comments: activitySummary.comments
            },

            timestamp: activity.timestamp
        },

        user: {
            likes: !!activityUserLike
        }
    });
};
