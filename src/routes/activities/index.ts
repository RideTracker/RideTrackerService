import { getActivityCommentsCount } from "../../controllers/activities/comments/getActivityCommentsCount";
import { getLatestActivityComment } from "../../controllers/activities/comments/getLatestActivityComment";
import { getActivityById } from "../../controllers/activities/getActivityById";
import { getActivityLikeByUser } from "../../controllers/activities/likes/getActivityLikeByUser";
import { getActivitySummaryByBike } from "../../controllers/activities/summary/getActivitySummaryByBike";
import { getActivitySummaryById } from "../../controllers/activities/summary/getActivitySummaryById";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getBikeModel } from "../../controllers/bikes/getBikeModel";
import { getUserById } from "../../controllers/users/getUserById";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const activityRequestSchema = {
    params: {
        id: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivityRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { id } = request.params;

    const activity = await getActivityById(databaseSource, id);

    if(!activity)
        return Response.json({ success: false });

    if(activity.status === "deleted")
        return Response.json({ success: false, deleted: true });

    const acitivityAuthor = await getUserById(databaseSource, activity.user);

    if(!acitivityAuthor)
        return Response.json({ success: false });

    const activitySummary = await getActivitySummaryById(databaseSource, id);

    const activityComment = await getLatestActivityComment(databaseSource, id);
    const activityCommentUser = (activityComment) && await getUserById(databaseSource, activityComment.user);

    const activityComments = await getActivityCommentsCount(databaseSource, activity.id);

    const activityUserLike = await getActivityLikeByUser(databaseSource, id, request.key.user);

    const activityBikeModel = (activity.bike) && await getBikeModel(databaseSource, activity.bike);

    return Response.json({
        success: true,

        activity: {
            id: activity.id,
            title: activity.title,
            description: activity.description,
            polylines: activity.polylines && JSON.parse(activity.polylines),
            startArea: activity.startArea,
            finishArea: activity.finishArea,
            bike: (activity.bike) && {
                id: activity.bike,
                model: activityBikeModel
            },
            visibility: activity.visibility,

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
