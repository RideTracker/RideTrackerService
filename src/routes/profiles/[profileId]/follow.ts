import { getActivityCountByUser } from "../../../controllers/activities/getActivityCountByUser";
import { createUserFollow } from "../../../controllers/users/follows/createUserFollow";
import { deleteUserFollow } from "../../../controllers/users/follows/deleteUserFollow";
import { getUserFollow } from "../../../controllers/users/follows/getUserFollow";
import { getUserFollowersCount } from "../../../controllers/users/follows/getUserFollowersCount";
import { getUserById } from "../../../controllers/users/getUserById";

export const profileFollowRequestSchema = {
    params: {
        userId: {
            type: "string",
            required: true
        }
    },

    content: {
        follow: {
            type: "boolean",
            required: true
        }
    }
};

export async function handleProfileFollowRequest(request: RequestWithKey, env: Env) {
    const { userId } = request.params;
    const { follow } = request.content;

    const user = await getUserById(env.DATABASE, userId);

    if(!user)
        return Response.json({ success: false });

    const userFollow = await getUserFollow(env.DATABASE, request.key.user, userId);

    if(userFollow && follow)
        return Response.json({ success: true, follow: true });
    
    if(!userFollow && !follow)
        return Response.json({ success: true, follow: false });

    if(follow) {
        if(!userFollow)
            await createUserFollow(env.DATABASE, request.key.user, user.id);
     
        return Response.json({ success: true, follow: true });
    }
    else {
        if(userFollow)
            await deleteUserFollow(env.DATABASE, userFollow.id);

        return Response.json({ success: true, follow: false });
    }
};
