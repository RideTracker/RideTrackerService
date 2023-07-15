import { getActivityCommentsCount } from "../../controllers/activities/comments/getActivityCommentsCount";
import { getLatestActivityComment } from "../../controllers/activities/comments/getLatestActivityComment";
import { getActivityById } from "../../controllers/activities/getActivityById";
import { getActivityLikeByUser } from "../../controllers/activities/likes/getActivityLikeByUser";
import { getActivitySummaryByBike } from "../../controllers/activities/summary/getActivitySummaryByBike";
import { getActivitySummaryById } from "../../controllers/activities/summary/getActivitySummaryById";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getUserById } from "../../controllers/users/getUserById";

export const activityRequestSchema = {
    params: {
        id: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityRequest(request: RequestWithKey, env: Env) {
    const { id } = request.params;

    const activity = await getActivityById(env.DATABASE, id);

    if(!activity)
        return Response.json({ success: false });

    if(activity.status === "deleted")
        return Response.json({ success: false, deleted: true });

    const acitivityAuthor = await getUserById(env.DATABASE, activity.user);

    if(!acitivityAuthor)
        return Response.json({ success: false });

    const activitySummary = await getActivitySummaryById(env.DATABASE, id);

    const activityComment = await getLatestActivityComment(env.DATABASE, id);
    const activityCommentUser = (activityComment) && await getUserById(env.DATABASE, activityComment.user);

    const activityComments = await getActivityCommentsCount(env.DATABASE, activity.id);

    const activityUserLike = await getActivityLikeByUser(env.DATABASE, id, request.key.user);

    return Response.json({
        success: true,

        activity: {
            id: activity.id,
            polylines: activity.polylines && JSON.parse(activity.polylines),
            startArea: activity.startArea,
            finishArea: activity.finishArea,
            bike: activity.bike,

            user: {
                id: acitivityAuthor.id,
                name: acitivityAuthor.firstname + " " + acitivityAuthor.lastname,
                avatar: acitivityAuthor.avatar
            },
            
            summary: activitySummary.map((activitySummary) => {
                return {
                    key: activitySummary.key,
                    value: activitySummary.value,
                    personalBest: activitySummary.personalBest
                };
            }),

            comments: activityComments,

            comment: activityComment && {
                message: activityComment.message,

                user: activityCommentUser && {
                    id: activityCommentUser.id,
                    name: activityCommentUser.firstname + " " + activityCommentUser.lastname,
                    avatar: activityCommentUser.avatar
                },

                timestamp: activityComment.timestamp
            },

            timestamp: activity.timestamp
        },

        user: {
            likes: !!activityUserLike
        }
    });
};
