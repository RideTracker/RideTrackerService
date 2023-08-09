import { getActivitiesByUser } from "../../controllers/activities/getActivitiesByUser";
import { getActivityCountByUser } from "../../controllers/activities/getActivityCountByUser";
import { getUserFollowersCount } from "../../controllers/users/follows/getUserFollowersCount";
import { getUserById } from "../../controllers/users/getUserById";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const profileActivitiesRequestSchema = {
    params: {
        userId: {
            type: "string",
            required: true
        }
    },

    content: {
        offset: {
            type: "number",
            required: true
        }
    }
};

export async function handleProfileActivitiesRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { userId } = request.params;
    const { offset } = request.content;

    const activities = await getActivitiesByUser(databaseSource, userId, offset);

    if(!activities || !activities.length)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        activities: activities.map((activity) => {
            return activity.id;
        }),

        offset: offset + activities.length
    });
};
