import { createUserAvatar } from "../../controllers/users/avatars/createUserAvatar";
import { setUserAvatar } from "../../controllers/users/setUserAvatar";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";
import { getDirectUploadUrl, uploadImage } from "../../utils/images";

export const uploadUserImageRequestSchema = {
    content: {
        image: {
            type: "string",
            required: true
        }
    }
};
export async function handleUploadUserAvatarRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { image } = request.content;

    const directUpload = await getDirectUploadUrl(env, {
        type: "user",
        user: request.key.user
    });

    if(!directUpload)
        return Response.json({ success: false });

    const upload = await uploadImage("Avatar.png", image, directUpload.url);

    if(!upload.success)
        return Response.json({ success: false });

    const userAvatar = await createUserAvatar(databaseSource, request.key.user, directUpload.id);

    if(!userAvatar)
        return Response.json({ success: false });

    await setUserAvatar(databaseSource, request.key.user, userAvatar.image);

    return Response.json({
        success: true,

        userAvatar: {
            id: userAvatar.id
        }
    });
};
