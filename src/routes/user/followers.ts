import { getUserFollowersByFeed } from "../../controllers/users/follows/getUserFollowersByFeed";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const userFollowersRequestSchema = {
    content: {
        offset: {
            type: "number",
            required: true
        }
    }
};

export async function handleUserFollowersRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { offset } = request.content;

    const followers = await getUserFollowersByFeed(databaseSource, request.key.user, offset, 10);

    return Response.json({
        success: true,

        followers: followers.map((followers) => {
            return {
                id: followers.id,
                timestamp: followers.timestamp,
                followsBack: followers.followsBack,

                follow: {
                    id: followers.user,
                    name: followers.firstname + " " + followers.lastname,
                    avatar: followers.avatar
                }
            };
        }),

        offset: offset + followers.length,
        limit: 10
    });
};
