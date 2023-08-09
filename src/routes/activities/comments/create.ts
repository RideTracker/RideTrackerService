import { createActivityComment } from "../../../controllers/activities/comments/createActivityComment";
import { getActivityById } from "../../../controllers/activities/getActivityById";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../../models/FeatureFlagsExecution";

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

export async function handleActivityCreateCommentRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { id } = request.params;
    const { parent, message } = request.content;

    const activity = await getActivityById(databaseSource, id);

    if(!activity)
        return Response.json({ success: false });

    if(activity.status === "deleted")
        return Response.json({ success: false });
    
    const comment = await createActivityComment(databaseSource, id, request.key.user, parent ?? null, message);

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
