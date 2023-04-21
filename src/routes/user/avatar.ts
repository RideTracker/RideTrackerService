import { getDirectUploadUrl, uploadImage } from "../../utils/images";

export const uploadUserImageRequestSchema = {
    content: {
        image: {
            type: "string",
            required: true
        },

        combination: {
            type: "object",
            required: true
        }
    }
};
export async function handleUploadUserAvatarRequest(request: Request, env: Env) {
    const { image, combination } = request.content;

    const directUpload = await getDirectUploadUrl(env, {
        type: "user",
        user: request.key.user
    });

    if(!directUpload)
        return Response.json({ success: false });

    const upload = await uploadImage("Avatar.png", image, directUpload.url);

    if(!upload.success)
        return upload;

    return Response.json({
        success: true
    });
};
