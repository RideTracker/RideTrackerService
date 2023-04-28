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

export async function handleActivityCommentsSummaryRequest(request: Request, env: Env) {
    const { activityId } = request.params;

    const comments = await getActivityCommentsSummary(env.DATABASE, activityId);

    if(!comments)
        return Response.json({ success: false });

    const commentUsers = await Promise.all(comments.map((comment) => getUserById(env.DATABASE, comment.user)));

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
