import { getBikesByUser } from "../controllers/bikes/getBikesByUser";
import { getBikePrimaryImage } from "../controllers/bikes/images/getBikePrimaryImage";

export async function handleBikesRequest(request: RequestWithKey, env: Env) {
    const bikes = await getBikesByUser(env.DATABASE, request.key.user);

    if(!bikes)
        return Response.json({ success: false });

    const bikeImages = await Promise.all(bikes.map((bike) => {
        return getBikePrimaryImage(env.DATABASE, bike.id);
    }));

    return Response.json({
        success: true,

        bikes: bikes.map((bike) => {
            const bikeImage = bikeImages.find((image) => image?.bike === bike.id);

            return {
                id: bike.id,
                name: bike.name,
                model: bike.model,
                image: bikeImage?.image
            }
        })
    });
};
