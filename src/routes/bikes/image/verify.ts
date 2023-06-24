import { createBike } from "../../../controllers/bikes/createBike";
import { getBikeById } from "../../../controllers/bikes/getBikeById";
import { createBikeImage } from "../../../controllers/bikes/images/createBikeImage";
import { getBikeImagesCount } from "../../../controllers/bikes/images/getBikeImagesCount";

export const verifyBikeImageRequestSchema = {
    params: {
        bikeId: {
            type: "string",
            required: true
        },

        imageId: {
            type: "string",
            required: true
        }
    }
};

export async function handleVerifyBikeImageRequest(request: RequestWithKey, env: Env) {
    const { bikeId, imageId } = request.params;

    const bike = await getBikeById(env.DATABASE, bikeId);

    if(!bike)
        return Response.json({ success: false });

    if(bike.user !== request.key.user)
        return Response.json({ success: false });

    const imageCount = await getBikeImagesCount(env.DATABASE, bike.id);

    if(imageCount >= 5)
        return Response.json({ success: false });
    
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${imageId}`, {
        method: "GET",
        
        headers: {
            "Authorization": `Bearer ${env.CLOUDFLARE_API_IMAGES_TOKEN}`,
            "Content-Type": "application/json"
        }
    });

    const result = await response.json() as any;

    if(!result.success)
        return Response.json({ success: false });

    if(result.result.draft === true)
        return Response.json({ success: false });

    if(result.result.metadata.type !== "bike")
        return Response.json({ success: false });

    if(result.result.metadata.user !== request.key.user)
        return Response.json({ success: false });

    if(result.result.metadata.bike !== bike.id)
        return Response.json({ success: false });

    const image = await createBikeImage(env.DATABASE, bike.id, result.result.id);

    if(!image)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        image: {
            id: image.id
        }
    });
};
