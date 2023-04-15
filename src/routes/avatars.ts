import { getAvatars } from "../controllers/avatars/getAvatars";
import { getUserAvatarByUser } from "../controllers/users/avatars/getUserAvatarByUser";
import { getUserAvatarsByUser } from "../controllers/users/avatars/getUserAvatarsByUser";
import { getUserById } from "../controllers/users/getUserById";

export async function handleAvatarsRequest(request: Request, env: Env) {
    const avatars = await getAvatars(env.DATABASE);

    if(!avatars)
        return Response.json({ success: false });

    const user = await getUserById(env.DATABASE, request.key.user);

    if(!user)
        return Response.json({ success: false });

    const userAvatars = await getUserAvatarsByUser(env.DATABASE, request.key.user);

    if(!userAvatars)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        avatars: avatars.map((avatar) => {
            return {
                id: avatar.id,
                type: avatar.type
            };
        }),

        user: {
            avatars: userAvatars.map((userAvatar) => {
                return {
                    id: userAvatar.id,
                    combination: JSON.parse(userAvatar.combination)
                }
            })
        }
    });
};
