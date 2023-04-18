import { createAvatarColor } from "../../../controllers/avatars/colors/createAvatarColor";
import { getAvatarById } from "../../../controllers/avatars/getAvatarById";
import { createAvatarImage } from "../../../controllers/avatars/images/createAvatarImage";

export async function handleCreateAvatarImageRequest(request: Request, env: Env) {
    const { avatarId } = request.params;
    const { image, index, colorIndex } = request.content;

    const avatar = await getAvatarById(env.DATABASE, avatarId);

    if(!avatar)
        return Response.json({ success: false });

    const avatarImage = await createAvatarImage(env.DATABASE, avatar.id, image, index, colorIndex ?? null);

    if(!avatarImage)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        avatar: {
            image: {
                id: avatarImage.id,
                image: avatarImage.image,
                index: avatarImage.index,
                colorIndex: avatarImage.colorIndex
            }
        }
    });
};
