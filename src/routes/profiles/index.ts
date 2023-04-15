import { getActivityCountByUser } from "../../controllers/activities/getActivityCountByUser";
import { getUserFollowersCount } from "../../controllers/users/follows/getUserFollowersCount";
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

    const userFollowsCount = await getUserFollowersCount(env.DATABASE, user.id);
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
                followers: userFollowsCount,
                activities: userActivitiesCount
            }
        }
    });
};
