import { createBike } from "../../controllers/bikes/createBike";
import { createBikeImage } from "../../controllers/bikes/images/createBikeImage";
import { getUserById } from "../../controllers/users/getUserById";
import { getDirectUploadUrl, uploadImage } from "../../utils/images";

export const createBikeRequestSchema = {
    content: {
        name: {
            type: "string",
            required: true
        },

        model: {
            type: "enum",
            required: false,

            schema: [ "road_bike", "mountain_bike", "fixed_gear", "touring_bike", "cruiser" ]
        },

        images: {
            type: "array",
            required: true,

            schema: {
                type: "string"
            }
        }
    }
};

export async function handleCreateBikeRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>) {
    let { name } = request.content;
    const { model, images } = request.content;

    if(images.length > 6)
        return Response.json({ success: false });

    const bike = await createBike(env.DATABASE, request.key.user, name, model);

    if(!bike)
        return Response.json({ success: false });

    if(!name?.length) {
        const user = await getUserById(env.DATABASE, request.key.user);

        name = `${user.firstname}'${(user.firstname.endsWith('s'))?(""):("s")} bike`;
    }
        
    if(images.length) {
        const directUpload = await getDirectUploadUrl(env, {
            type: "bike",
            user: request.key.user,
            bike: bike.id
        });

        if(!directUpload)
            return Response.json({ success: false });

        const upload = await uploadImage("Bike.png", images[0], directUpload.url);

        if(!upload.success)
            return Response.json({ success: false });

        await createBikeImage(env.DATABASE, bike.id, directUpload.id, 0);

        images.shift();

        if(images.length) {
            context.waitUntil(Promise.all(images.map(async (image: string, index: number) => {
                const directUpload = await getDirectUploadUrl(env, {
                    type: "bike",
                    user: request.key.user,
                    bike: bike.id
                });

                if(!directUpload)
                    return;

                const upload = await uploadImage("Bike.png", image, directUpload.url);

                if(!upload.success)
                    return;

                await createBikeImage(env.DATABASE, bike.id, directUpload.id, 1 + index);
            })));
        }
    }

    return Response.json({
        success: true,

        bike: {
            id: bike.id
        }
    });
};
