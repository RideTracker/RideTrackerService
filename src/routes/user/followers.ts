import { getUserFollowersByFeed } from "../../controllers/users/follows/getUserFollowersByFeed";

export const userFollowersRequestSchema = {
    content: {
        offset: {
            type: "number",
            required: true
        }
    }
};

export async function handleUserFollowersRequest(request: RequestWithKey, env: Env) {
    const { offset } = request.content;

    const following = await getUserFollowersByFeed(env.DATABASE, request.key.user, offset, 10);

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
