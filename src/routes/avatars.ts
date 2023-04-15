import { getAvatars } from "../controllers/avatars/getAvatars";

export async function handleAvatarsRequest(request: Request, env: Env) {
    const avatars = await getAvatars(env.DATABASE);

    if(!avatars)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        avatars: avatars.map((avatar) => {
            return {
                id: avatar.id,
                type: avatar.type
            };
        })
    });
};
