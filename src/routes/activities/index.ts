import { getLatestActivityComment } from "../../controllers/activities/comments/getLatestActivityComment";
import { getActivityById } from "../../controllers/activities/getActivityById";
import { getActivityLikeByUser } from "../../controllers/activities/likes/getActivityLikeByUser";
import { getActivitySummaryById } from "../../controllers/activities/summary/getActivitySummaryById";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getBikeSummaryById } from "../../controllers/bikes/summary/getBikeSummaryById";
import { getUserById } from "../../controllers/users/getUserById";
import { User } from "../../models/user";

export const activityRequestSchema = {
    params: {
        id: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityRequest(request: Request, env: Env) {
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

    const activityUserLike = await getActivityLikeByUser(env.DATABASE, id, request.key.user);

    return Response.json({
        success: true,

        activity: {
            id: activity.id,

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
            
            summary: activitySummary && {
                area: activitySummary.area,
                distance: activitySummary.distance,
                averageSpeed: activitySummary.averageSpeed,
                elevation: activitySummary.elevation,
                maxSpeed: activitySummary.maxSpeed,
                comments: activitySummary.comments
            },

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
