import { getActivityComments } from "../../controllers/activities/comments/getActivityComments";
import { getActivityById } from "../../controllers/activities/getActivityById";
import { getUserById } from "../../controllers/users/getUserById";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export async function handleActivityCommentsRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { id } = request.params;

    const activity = await getActivityById(databaseSource, id);

    if(activity.status === "deleted")
        return Response.json({ success: false });

    const comments = await getActivityComments(databaseSource, id);

    if(!comments)
        return Response.json({ success: false });

    const commentUsers = await Promise.all(comments.map((comment) => {
        return getUserById(databaseSource, comment.user);
    }));

    return Response.json({
        success: true,

        comments: comments.map((comment) => {
            const commentUser = commentUsers.find((user) => user?.id === comment.user);

            return {
                id: comment.id,
                parent: comment.parent,
                message: comment.message,
                timestamp: comment.timestamp,

                user: commentUser && {
                    id: commentUser.id,
                    name: commentUser.firstname + " " + commentUser.lastname,
                    avatar: commentUser.avatar
                }
            }
        })
    });
};
