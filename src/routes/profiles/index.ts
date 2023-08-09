import { getActivityCountByUser } from "../../controllers/activities/getActivityCountByUser";
import { getUserFollowersCount } from "../../controllers/users/follows/getUserFollowersCount";
import { hasUserFollow } from "../../controllers/users/follows/hasUserFollow";
import { getUserById } from "../../controllers/users/getUserById";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const profileRequestSchema = {
    params: {
        userId: {
            type: "string",
            required: true
        }
    }
};

export async function handleProfileRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { userId } = request.params;

    const user = await getUserById(databaseSource, userId);

    if(!user)
        return Response.json({ success: false });

    const userFollowsCount = await getUserFollowersCount(databaseSource, user.id);
    const userActivitiesCount = await getActivityCountByUser(databaseSource, user.id);

    const follow = await hasUserFollow(databaseSource, request.key.user, user.id);

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
