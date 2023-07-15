import { createActivityComment } from "../../../controllers/activities/comments/createActivityComment";
import { getActivityCommentById } from "../../../controllers/activities/comments/getActivityCommentById";
import { setActivityCommentMessage } from "../../../controllers/activities/comments/setActivityComentMessage";
import { getActivityById } from "../../../controllers/activities/getActivityById";

export const activityEditCommentRequestSchema = {
    params: {
        activityId: {
            type: "string",
            required: true
        },
        
        commentId: {
            type: "string",
            required: true
        }
    },

    content: {
        message: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityEditCommentRequest(request: RequestWithKey, env: Env) {
    const { activityId, commentId } = request.params;
    const { message } = request.content;

    const activity = await getActivityById(env.DATABASE, activityId);

    if(!activity)
        return Response.json({ success: false });

    if(activity.status === "deleted")
        return Response.json({ success: false });

    const comment = await getActivityCommentById(env.DATABASE, commentId);

    if(!comment)
        return Response.json({ success: false });

    if(comment.user !== request.key.user)
        return Response.json({ success: false });

    await setActivityCommentMessage(env.DATABASE, comment.id, message);

    return Response.json({
        success: true
    });
};
