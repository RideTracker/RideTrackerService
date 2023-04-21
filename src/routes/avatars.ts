import { getAvatarColors } from "../controllers/avatars/colors/getAvatarColors";
import { getAvatars } from "../controllers/avatars/getAvatars";
import { getAvatarImages } from "../controllers/avatars/images/getAvatarImages";
import { getUserAvatarByUser } from "../controllers/users/avatars/getUserAvatarByUser";
import { getUserAvatarsByUser } from "../controllers/users/avatars/getUserAvatarsByUser";
import { getUserById } from "../controllers/users/getUserById";

export async function handleAvatarsRequest(request: Request, env: Env) {
    const avatars = await getAvatars(env.DATABASE);

    if(!avatars)
        return Response.json({ success: false });

    const avatarColors = await getAvatarColors(env.DATABASE);

    if(!avatarColors)
        return Response.json({ success: false });

    const avatarImages = await getAvatarImages(env.DATABASE);

    if(!avatarImages)
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
                type: avatar.type,
                image: avatar.image,

                colors: avatarColors.filter((avatarColor) => avatarColor.avatar === avatar.id).map((avatarColor) => {
                    return {
                        type: avatarColor.type,
                        index: avatarColor.index,
                        defaultColor: avatarColor.defaultColor
                    }
                }),

                images: avatarImages.filter((avatarImage) => avatarImage.avatar === avatar.id).map((avatarImage) => {
                    return {
                        index: avatarImage.index,
                        image: avatarImage.image,
                        colorType: avatarImage.colorType
                    }
                })
            };
        }),

        user: {
            avatars: userAvatars.map((userAvatar) => {
                return {
                    id: userAvatar.id,
                    image: userAvatar.image,
                    combination: JSON.parse(userAvatar.combination)
                }
            })
        }
    });
};
