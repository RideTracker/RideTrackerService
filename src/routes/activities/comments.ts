import { getActivityComments } from "../../controllers/activities/comments/getActivityComments";
import { getLatestActivityComment } from "../../controllers/activities/comments/getLatestActivityComment";
import { getActivityById } from "../../controllers/activities/getActivityById";
import { getActivityLikeByUser } from "../../controllers/activities/likes/getActivityLikeByUser";
import { getActivitySummaryById } from "../../controllers/activities/summary/getActivitySummaryById";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getBikeSummaryById } from "../../controllers/bikes/summary/getBikeSummaryById";
import { getUserById } from "../../controllers/users/getUserById";
import { User } from "../../models/user";

export async function handleActivityCommentsRequest(request: Request, env: Env) {
    const { id } = request.params;

    const comments = await getActivityComments(env.DATABASE, id);

    if(!comments)
        return Response.json({ success: false });

    const commentUsers = await Promise.all(comments.map((comment) => {
        return getUserById(env.DATABASE, comment.user);
    }));

    return Response.json({
        success: true,

        comments: comments.map((comment) => {
            const commentUser = commentUsers.find((user) => user?.id === comment.user);

            return {
                message: comment.message,

                user: commentUser && {
                    id: commentUser.id,
                    name: commentUser.firstname + " " + commentUser.lastname,
                    avatar: commentUser.avatar
                },

                timestamp: comment.timestamp
            }
        })
    });
};