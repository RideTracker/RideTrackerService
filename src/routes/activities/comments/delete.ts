import { createActivityComment } from "../../../controllers/activities/comments/createActivityComment";
import { deleteActivityCommentMessage } from "../../../controllers/activities/comments/deleteActivityComent";
import { getActivityCommentById } from "../../../controllers/activities/comments/getActivityCommentById";
import { setActivityCommentMessage } from "../../../controllers/activities/comments/setActivityComentMessage";
import { getActivityById } from "../../../controllers/activities/getActivityById";

export const activityDeleteCommentRequestSchema = {
    params: {
        activityId: {
            type: "string",
            required: true
        },
        
        commentId: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityDeleteCommentRequest(request: Request, env: Env) {
    const { activityId, commentId } = request.params;

    const activity = await getActivityById(env.DATABASE, activityId);

    if(!activity)
        return Response.json({ success: false });

    const comment = await getActivityCommentById(env.DATABASE, commentId);

    if(!comment)
        return Response.json({ success: false });

    if(comment.user !== request.key.user)
        return Response.json({ success: false });

    await deleteActivityCommentMessage(env.DATABASE, comment.id);

    return Response.json({
        success: true
    });
};
