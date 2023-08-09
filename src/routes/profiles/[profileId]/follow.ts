import { getActivityCountByUser } from "../../../controllers/activities/getActivityCountByUser";
import { createUserFollow } from "../../../controllers/users/follows/createUserFollow";
import { deleteUserFollow } from "../../../controllers/users/follows/deleteUserFollow";
import { getUserFollow } from "../../../controllers/users/follows/getUserFollow";
import { getUserFollowersCount } from "../../../controllers/users/follows/getUserFollowersCount";
import { getUserById } from "../../../controllers/users/getUserById";
import DatabaseSource from "../../../database/databaseSource";
import { FeatureFlagsExecution } from "../../../models/FeatureFlagsExecution";

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

export async function handleProfileFollowRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { userId } = request.params;
    const { follow } = request.content;

    if(request.key.user === userId)
        return Response.json({ success: false });

    const user = await getUserById(databaseSource, userId);

    if(!user)
        return Response.json({ success: false });

    const userFollow = await getUserFollow(databaseSource, request.key.user, userId);

    if(userFollow && follow)
        return Response.json({ success: true, follow: true });
    
    if(!userFollow && !follow)
        return Response.json({ success: true, follow: false });

    if(follow) {
        if(!userFollow)
            await createUserFollow(databaseSource, request.key.user, user.id);
     
        return Response.json({ success: true, follow: true });
    }
    else {
        if(userFollow)
            await deleteUserFollow(databaseSource, userFollow.id);

        return Response.json({ success: true, follow: false });
    }
};
