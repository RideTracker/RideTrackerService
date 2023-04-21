import { createUserAvatar } from "../../../controllers/users/avatars/createUserAvatar";
import { getImage } from "../../../utils/images";

export const verifyUserImageRequestSchema = {
    content: {
        imageId: {
            type: "string",
            required: true
        },

        combination: {
            type: "object"
        }
    }
};

export async function handleVerifyUserImageRequest(request: Request, env: Env) {
    const { imageId, combination } = request.content;

    const image = await getImage(env, imageId);

    if(!image)
        return Response.json({ success: false });

    if(image.draft)
        return Response.json({ success: false });

    if(image.metadata.type !== "user")
        return Response.json({ success: false });

    if(image.metadata.user !== request.key.user)
        return Response.json({ success: false });

    const userAvatar = await createUserAvatar(env.DATABASE, request.key.user, image.id, JSON.stringify(combination));

    if(!userAvatar)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        image: {
            id: image.id
        }
    });
};
