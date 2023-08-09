import { createBike } from "../../controllers/bikes/createBike";
import getFormattedBikeModel from "../../controllers/bikes/getFormattedBikeModel";
import { createBikeImage } from "../../controllers/bikes/images/createBikeImage";
import { getUserById } from "../../controllers/users/getUserById";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";
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

export async function handleCreateBikeRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    let { name } = request.content;
    const { model, images } = request.content;

    if(images.length > 6)
        return Response.json({ success: false });

    if(!name?.length) {
        const user = await getUserById(databaseSource, request.key.user);

        name = `${user.firstname}'${(user.firstname.endsWith('s'))?(""):("s")} ${getFormattedBikeModel(model).toLowerCase()}`;
    }

    const bike = await createBike(databaseSource, request.key.user, name, model);

    if(!bike)
        return Response.json({ success: false });
        
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

        await createBikeImage(databaseSource, bike.id, directUpload.id, 0);

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

                await createBikeImage(databaseSource, bike.id, directUpload.id, 1 + index);
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
