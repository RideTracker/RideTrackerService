import { createActivity } from "../../../controllers/activities/createActivity";
import { getBikeById } from "../../../controllers/bikes/getBikeById";
import { Bike } from "../../../models/bike";
import { triggerAlarm } from "../../../controllers/alarms/triggerAlarm";
import { getActivityById } from "../../../controllers/activities/getActivityById";
import { updateActivity } from "../../../controllers/activities/updateActivity";

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
            required: true,

            schema: [ "PUBLIC", "FOLLOWERS_ONLY", "UNLISTED", "PRIVATE" ]
        }
    }
};

export async function handleUpdateActivityRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>) {
    const { activityId } = request.params;
    const { visibility, title, description, bikeId } = request.content;

    const bike: Bike | null = bikeId && await getBikeById(env.DATABASE, bikeId);
    
    if(bikeId && bike?.user !== request.key.user)
        return Response.json({ success: false });

    const activity = await getActivityById(env.DATABASE, activityId);

    if(!activity)
        return Response.json({ success: false });

    if(activity.status === "deleted")
        return Response.json({ success: false });

    if(activity.user !== request.key.user)
        return Response.json({ success: false });

    await updateActivity(env.DATABASE, activity.id, visibility, title ?? null, description ?? null, bike?.id ?? null);

    return Response.json({
        success: true
    });
};
