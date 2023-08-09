import { createBike } from "../../controllers/bikes/createBike";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getBikeImagesCount } from "../../controllers/bikes/images/getBikeImagesCount";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const uploadBikeImageRequestSchema = {
    params: {
        bikeId: {
            type: "string",
            required: true
        }
    }
};

export async function handleUploadBikeImageRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { bikeId } = request.params;

    const bike = await getBikeById(databaseSource, bikeId);

    if(!bike)
        return Response.json({ success: false });

    if(bike.user !== request.key.user)
        return Response.json({ success: false });

    const imageCount = await getBikeImagesCount(databaseSource, bike.id);

    if(imageCount >= 5)
        return Response.json({ success: false });
    
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`, {
        method: "POST",
        
        headers: {
            "Authorization": `Bearer ${env.CLOUDFLARE_API_IMAGES_TOKEN}`,
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            metadata: {
                type: "bike",
                user: request.key.user,
                bike: bike.id
            }
        })
    });

    const result = await response.json() as any;

    if(!result.success)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        result: {
            id: result.result.id,
            url: result.result.uploadURL
        }
    });
};
