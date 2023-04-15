import { getLatestActivityComment } from "../../controllers/activities/comments/getLatestActivityComment";
import { getActivityById } from "../../controllers/activities/getActivityById";
import { getActivityCountByUser } from "../../controllers/activities/getActivityCountByUser";
import { getActivityLikeByUser } from "../../controllers/activities/likes/getActivityLikeByUser";
import { getActivitySummaryById } from "../../controllers/activities/summary/getActivitySummaryById";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getBikeSummaryById } from "../../controllers/bikes/summary/getBikeSummaryById";
import { getUserById } from "../../controllers/users/getUserById";

export const profileRequestSchema = {
    params: {
        userId: {
            type: "string",
            required: true
        }
    }
};

export async function handleProfileRequest(request: Request, env: Env) {
    const { userId } = request.params;

    const user = await getUserById(env.DATABASE, userId);

    if(!user)
        return Response.json({ success: false });

    const userActivitiesCount = await getActivityCountByUser(env.DATABASE, user.id);

    return Response.json({
        success: true,

        profile: {
            user: {
                id: user.id,
                name: user.firstname + " " + user.lastname,
                avatar: user.avatar
            },

            stats: {
                followers: 0,
                activities: userActivitiesCount
            }
        }
    });
};
