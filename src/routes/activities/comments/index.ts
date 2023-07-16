import { getActivityById } from "@ridetracker/ridetrackerclient";
import { getActivityCommentById } from "../../../controllers/activities/comments/getActivityCommentById";
import { getUserById } from "../../../controllers/users/getUserById";

export const activityCommentRequestSchema = {
    params: {
        id: {
            type: "string",
            required: true
        },
        
        commentId: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityCommentRequest(request: RequestWithKey, env: Env) {
    const { id, commentId } = request.params;

    const comment = await getActivityCommentById(env.DATABASE, commentId);

    if(!comment)
        return Response.json({ success: false });

    if(comment.activity !== id)
        return Response.json({ success: false });

    const commentUser = await getUserById(env.DATABASE, comment.user);

    return Response.json({
        success: true,

        comment: {
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
    });
};
