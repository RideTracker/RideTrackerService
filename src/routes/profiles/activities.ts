import { getActivitiesByUser } from "../../controllers/activities/getActivitiesByUser";
import { getActivityCountByUser } from "../../controllers/activities/getActivityCountByUser";
import { getUserFollowersCount } from "../../controllers/users/follows/getUserFollowersCount";
import { getUserById } from "../../controllers/users/getUserById";

export const profileActivitiesRequestSchema = {
    params: {
        userId: {
            type: "string",
            required: true
        }
    },

    content: {
        offset: {
            type: "number",
            required: true
        }
    }
};

export async function handleProfileActivitiesRequest(request: Request, env: Env) {
    const { userId } = request.params;
    const { offset } = request.content;

    const activities = await getActivitiesByUser(env.DATABASE, userId, offset);

    if(!activities || !activities.length)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        activities: activities.map((activity) => {
            return activity.id;
        }),

        offset: offset + activities.length
    });
};
