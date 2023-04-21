import { getDirectUploadUrl } from "../../utils/images";

export async function handleUploadUserAvatarRequest(request: Request, env: Env) {
    const directUpload = await getDirectUploadUrl(env, {
        type: "user",
        user: request.key.user
    });

    if(!directUpload)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        result: {
            id: directUpload.id,
            url: directUpload.url
        }
    });
};
