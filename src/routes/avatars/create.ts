import { createAvatar } from "../../controllers/avatars/createAvatar";
import { deleteAvatarById } from "../../controllers/avatars/deleteAvatarById";
import { getAvatarByName } from "../../controllers/avatars/getAvatarByName";

export async function handleCreateAvatarRequest(request: Request, env: Env) {
    const { name, type, image } = request.content;

    const existingAvatar = await getAvatarByName(env.DATABASE, name);
    
    if(existingAvatar)
        await deleteAvatarById(env.DATABASE, existingAvatar.id);

    const id = existingAvatar?.id ?? crypto.randomUUID();

    const avatar = await createAvatar(env.DATABASE, id, name, type, image, Date.now());

    if(!avatar)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        avatar: {
            id: avatar.id,
            name: avatar.name,
            type: avatar.type,
            image: avatar.image
        }
    });
};
