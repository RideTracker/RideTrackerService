import { getActivityCommentsCount } from "../../../controllers/activities/comments/getActivityCommentsCount";
import { getActivityCommentsSummary } from "../../../controllers/activities/comments/getActivityCommentsSummary";
import { getUserById } from "../../../controllers/users/getUserById";

export const activityCommentSummaryRequestSchema = {
    params: {
        activityId: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityCommentsSummaryRequest(request: RequestWithKey, env: Env) {
    const { activityId } = request.params;

    const comments = await getActivityCommentsSummary(env.DATABASE, activityId);

    if(!comments)
        return Response.json({ success: false });

    const count = await getActivityCommentsCount(env.DATABASE, activityId);

    const commentUsers = await Promise.all(comments.map((comment) => getUserById(env.DATABASE, comment.user)));

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
