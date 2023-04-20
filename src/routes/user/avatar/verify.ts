import { createBike } from "../../../controllers/bikes/createBike";
import { getBikeById } from "../../../controllers/bikes/getBikeById";
import { createBikeImage } from "../../../controllers/bikes/images/createBikeImage";
import { getBikeImagesCount } from "../../../controllers/bikes/images/getBikeImagesCount";

export const verifyUserImageRequestSchema = {
    content: {
        imageId: {
            type: "string",
            required: true
        }
    }
};

export async function handleVerifyUserImageRequest(request: Request, env: Env) {
    const { imageId } = request.content;

    const image = await getImage(env, imageId);

    if(!image)
        return Response.json({ success: false });

    if(image.draft)
        return Response.json({ success: false });

    if(image.metadata.type !== "user")
        return Response.json({ success: false });

    if(image.metadata.user !== request.key.user)
        return Response.json({ success: false });

    //const userAvatar = await setUser

    if(!image)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        image: {
            id: image.id
        }
    });
};
