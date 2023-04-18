import { createAvatarColor } from "../../../controllers/avatars/colors/createAvatarColor";
import { getAvatarById } from "../../../controllers/avatars/getAvatarById";

export async function handleCreateAvatarColorRequest(request: Request, env: Env) {
    const { avatarId } = request.params;
    const { type, index, defaultColor } = request.content;

    const avatar = await getAvatarById(env.DATABASE, avatarId);

    if(!avatar)
        return Response.json({ success: false });

    const avatarColor = await createAvatarColor(env.DATABASE, avatar.id, type, index, defaultColor ?? null);

    if(!avatarColor)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        avatar: {
            color: {
                id: avatarColor.id,
                type: avatarColor.type,
                index: avatarColor.index,
                defaultColor: avatarColor.defaultColor
            }
        }
    });
};
