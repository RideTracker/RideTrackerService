import { getActivitiesByUser } from "../../controllers/activities/getActivitiesByUser";
import { getActivityCountByUser } from "../../controllers/activities/getActivityCountByUser";
import { getBikesByUser } from "../../controllers/bikes/getBikesByUser";
import { getBikesByUserOffset } from "../../controllers/bikes/getBikesByUserOffset";
import { getUserFollowersCount } from "../../controllers/users/follows/getUserFollowersCount";
import { getUserById } from "../../controllers/users/getUserById";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const profileBikesRequestSchema = {
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

export async function handleProfileBikesRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { userId } = request.params;
    const { offset } = request.content;

    const bikes = await getBikesByUserOffset(databaseSource, userId, offset);

    if(!bikes || !bikes.length)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        bikes: bikes.map((bike) => {
            return bike.id;
        }),

        offset: offset + bikes.length
    });
};
