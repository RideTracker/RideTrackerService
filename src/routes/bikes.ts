import { getBikesByUser } from "../controllers/bikes/getBikesByUser";
import { getBikePrimaryImage } from "../controllers/bikes/images/getBikePrimaryImage";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../models/FeatureFlagsExecution";

export async function handleBikesRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const bikes = await getBikesByUser(databaseSource, request.key.user);

    if(!bikes)
        return Response.json({ success: false });

    const bikeImages = await Promise.all(bikes.map((bike) => {
        return getBikePrimaryImage(databaseSource, bike.id);
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
