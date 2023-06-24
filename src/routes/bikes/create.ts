import { createBike } from "../../controllers/bikes/createBike";

export const createBikeRequestSchema = {
    content: {
        name: {
            type: "string",
            required: true
        }
    }
};

export async function handleCreateBikeRequest(request: RequestWithKey, env: Env) {
    const { name } = request.content;

    const bike = await createBike(env.DATABASE, request.key.user, name);

    if(!bike)
        return Response.json({ success: false });

    return Response.json({
        success: true,

        bike: {
            id: bike.id,
            name: bike.name
        }
    });
};
