import { createUserAvatar } from "../../controllers/users/avatars/createUserAvatar";
import { setUserAvatar } from "../../controllers/users/setUserAvatar";
import { getDirectUploadUrl, uploadImage } from "../../utils/images";

export const uploadUserImageRequestSchema = {
    content: {
        image: {
            type: "string",
            required: true
        }
    }
};
export async function handleUploadUserAvatarRequest(request: RequestWithKey, env: Env) {
    const { image, combination } = request.content;

    const directUpload = await getDirectUploadUrl(env, {
        type: "user",
        user: request.key.user
    });

    if(!directUpload)
        return Response.json({ success: false });

    const upload = await uploadImage("Avatar.png", image, directUpload.url);

    if(!upload.success)
        return Response.json({ success: false });

    const userAvatar = await createUserAvatar(env.DATABASE, request.key.user, directUpload.id);

    if(!userAvatar)
        return Response.json({ success: false });

    await setUserAvatar(env.DATABASE, request.key.user, userAvatar.image);

    return Response.json({
        success: true,

        userAvatar: {
            id: userAvatar.id
        }
    });
};
