import { getBikeById } from "../../../controllers/bikes/getBikeById";
import { Bike } from "../../../models/bike";
import { getActivityById } from "../../../controllers/activities/getActivityById";
import { updateActivity } from "../../../controllers/activities/updateActivity";
import DatabaseSource from "../../../database/databaseSource";
import { FeatureFlagsExecution } from "../../../models/FeatureFlagsExecution";

export const updateActivityRequestSchema = {
    params: {
        activityId: {
            type: "string",
            required: true
        }
    },

    content: {
        title: {
            type: "string"
        },
        
        description: {
            type: "string"
        },
        
        bikeId: {
            type: "string"
        },

        visibility: {
            type: "enum",
            schema: [ "PUBLIC", "FOLLOWERS_ONLY", "UNLISTED", "PRIVATE" ]
        }
    }
};

export async function handleUpdateActivityRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { activityId } = request.params;
    const { title, description, bikeId } = request.content;
    let { visibility } = request.content;

    const bike: Bike | null = bikeId && await getBikeById(databaseSource, bikeId);
    
    if(bikeId && bike?.user !== request.key.user)
        return Response.json({ success: false });

    const activity = await getActivityById(databaseSource, activityId);

    if(!activity)
        return Response.json({ success: false });

    // visibility was bugged when creating an activity in RideTrackerApp-0.9.2
    if(!visibility) {
        if(request.userAgent.isBelow("RideTrackerApp-0.9.3")) {
            visibility = activity.visibility;
        }
    }

    if(activity.status === "deleted")
        return Response.json({ success: false });

    if(activity.user !== request.key.user)
        return Response.json({ success: false });

    await updateActivity(databaseSource, activity.id, visibility, title ?? null, description ?? null, bike?.id ?? null);

    return Response.json({
        success: true
    });
};
