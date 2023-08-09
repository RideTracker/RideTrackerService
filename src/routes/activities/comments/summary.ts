import { getActivityCommentsCount } from "../../../controllers/activities/comments/getActivityCommentsCount";
import { getActivityCommentsSummary } from "../../../controllers/activities/comments/getActivityCommentsSummary";
import { getActivityById } from "../../../controllers/activities/getActivityById";
import { getUserById } from "../../../controllers/users/getUserById";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../../models/FeatureFlagsExecution";

export const activityCommentSummaryRequestSchema = {
    params: {
        activityId: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityCommentsSummaryRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { activityId } = request.params;

    const activity = await getActivityById(databaseSource, activityId);

    if(activity.status === "deleted")
        return Response.json({ success: false, message: "Activity has been deleted." });

    const comments = await getActivityCommentsSummary(databaseSource, activityId);

    if(!comments)
        return Response.json({ success: false, message: "!comments" });

    const count = await getActivityCommentsCount(databaseSource, activityId);

    const commentUsers = await Promise.all(comments.map((comment) => getUserById(databaseSource, comment.user)));

    return Response.json({
        success: true,

        commentsCount: count,

        comments: comments.map((comment) => {
            const commentUser = commentUsers.find((user) => user?.id === comment.user);

            return {
                id: comment.id,
                parent: comment.parent,
                message: comment.message,
                timestamp: comment.timestamp,
                comments_count: comment.comments_count,

                user: commentUser && {
                    id: commentUser.id,
                    name: commentUser.firstname + " " + commentUser.lastname,
                    avatar: commentUser.avatar
                }
            }
        })
    });
};
