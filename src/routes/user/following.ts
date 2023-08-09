import { getUserFollowingByFeed } from "../../controllers/users/follows/getUserFollowingByFeed";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const userFollowingRequestSchema = {
    content: {
        offset: {
            type: "number",
            required: true
        }
    }
};

export async function handleUserFollowingRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { offset } = request.content;

    const following = await getUserFollowingByFeed(databaseSource, request.key.user, offset, 10);

    return Response.json({
        success: true,

        following: following.map((following) => {
            return {
                id: following.id,
                timestamp: following.timestamp,

                follow: {
                    id: following.follow,
                    name: following.firstname + " " + following.lastname,
                    avatar: following.avatar
                }
            };
        }),

        offset: offset + following.length,
        limit: 10
    });
};
