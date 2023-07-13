import { getActivityCountByUser } from "../../controllers/activities/getActivityCountByUser";
import { getUserFollowersCount } from "../../controllers/users/follows/getUserFollowersCount";
import { hasUserFollow } from "../../controllers/users/follows/hasUserFollow";
import { getUserById } from "../../controllers/users/getUserById";

export const profileRequestSchema = {
    params: {
        userId: {
            type: "string",
            required: true
        }
    }
};

export async function handleProfileRequest(request: RequestWithKey, env: Env) {
    const { userId } = request.params;

    const user = await getUserById(env.DATABASE, userId);

    if(!user)
        return Response.json({ success: false });

    const userFollowsCount = await getUserFollowersCount(env.DATABASE, user.id);
    const userActivitiesCount = await getActivityCountByUser(env.DATABASE, user.id);

    const follow = await hasUserFollow(env.DATABASE, request.key.user, user.id);

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
        },

        follow
    });
};
