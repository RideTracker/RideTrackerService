import { getActivityCommentsCount } from "../../controllers/activities/comments/getActivityCommentsCount";
import { getLatestActivityComment } from "../../controllers/activities/comments/getLatestActivityComment";
import { getActivityById } from "../../controllers/activities/getActivityById";
import { getActivityLikeByUser } from "../../controllers/activities/likes/getActivityLikeByUser";
import { getActivitySummaryById } from "../../controllers/activities/summary/getActivitySummaryById";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getBikeSummaryById } from "../../controllers/activities/summary/getActivitySummaryByBike";
import { getUserById } from "../../controllers/users/getUserById";
import { User } from "../../models/user";
import { handleActivitySummaryRequest } from "./[activityId]/summary";

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

    const acitivityAuthor = await getUserById(env.DATABASE, activity.user);

    if(!acitivityAuthor)
        return Response.json({ success: false });

    const activityBike = (activity.bike) && await getBikeById(env.DATABASE, activity.bike);
    const activityBikeSummary = (activityBike) && await getBikeSummaryById(env.DATABASE, activityBike.id);

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

            user: {
                id: acitivityAuthor.id,
                name: acitivityAuthor.firstname + " " + acitivityAuthor.lastname,
                avatar: acitivityAuthor.avatar
            },

            bike: activityBike && {
                id: activityBike.id,
                name: activityBike.name,
                model: activityBike.model,
                image: activityBike.image,

                summary: activityBikeSummary && {
                    rides: activityBikeSummary.rides,
                    distance: activityBikeSummary.distance,
                    elevation: activityBikeSummary.elevation
                }
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
