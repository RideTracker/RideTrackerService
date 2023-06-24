import { createActivityComment } from "../../../controllers/activities/comments/createActivityComment";
import { getActivityComments } from "../../../controllers/activities/comments/getActivityComments";
import { getLatestActivityComment } from "../../../controllers/activities/comments/getLatestActivityComment";
import { getActivityById } from "../../../controllers/activities/getActivityById";
import { getActivityLikeByUser } from "../../../controllers/activities/likes/getActivityLikeByUser";
import { getActivitySummaryById } from "../../../controllers/activities/summary/getActivitySummaryById";
import { getBikeById } from "../../../controllers/bikes/getBikeById";
import { getBikeSummaryById } from "../../../controllers/bikes/summary/getBikeSummaryById";
import { getUserById } from "../../../controllers/users/getUserById";
import { User } from "../../../models/user";

export const activityCreateCommentRequestSchema = {
    params: {
        id: {
            type: "string",
            required: true
        }
    },

    content: {
        parent: {
            type: "string",
            required: false
        },

        message: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityCreateCommentRequest(request: RequestWithKey, env: Env) {
    const { id } = request.params;
    const { parent, message } = request.content;

    const activity = await getActivityById(env.DATABASE, id);

    if(!activity)
        return Response.json({ success: false });
    
    const comment = await createActivityComment(env.DATABASE, id, request.key.user, parent ?? null, message);

    if(!comment)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        comment: {
            id: comment.id,
            activity: comment.activity
        }
    });
};
