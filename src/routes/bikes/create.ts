import { createBike } from "../../controllers/bikes/createBike";
import { createBikeImage } from "../../controllers/bikes/images/createBikeImage";
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

export async function handleCreateBikeRequest(request: RequestWithKey, env: Env) {
    const { name, model, images } = request.content;

    if(images.length > 6)
        return Response.json({ success: false });

    const bike = await createBike(env.DATABASE, request.key.user, name, model);

    if(!bike)
        return Response.json({ success: false });

    await Promise.allSettled(images.map((base64: string, index: number) => {
        return new Promise(async (resolve, reject) => {
            const directUpload = await getDirectUploadUrl(env, {
                type: "bike",
                user: request.key.user,
                bike: bike.id
            });
    
            if(!directUpload)
                return reject({ success: false });

            const upload = await uploadImage("Avatar.png", base64, directUpload.url);

            if(!upload.success)
                return reject({ success: false });
        
            await createBikeImage(env.DATABASE, bike.id, directUpload.id, index);

            resolve(void 0);
        });
    }));

    return Response.json({
        success: true,

        bike: {
            id: bike.id
        }
    });
};
