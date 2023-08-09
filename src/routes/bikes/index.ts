import { getActivitySummaryByBike } from "../../controllers/activities/summary/getActivitySummaryByBike";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getBikePrimaryImage } from "../../controllers/bikes/images/getBikePrimaryImage";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const bikeRequestSchema = {
    params: {
        bikeId: {
            type: "string",
            required: true
        }
    }
};

export async function handleBikeRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { bikeId } = request.params;

    const bike = await getBikeById(databaseSource, bikeId);

    if(!bike)
        return Response.json({ success: false });

    const bikeSummary = await getActivitySummaryByBike(databaseSource, bike.id);
    const bikeImage = await getBikePrimaryImage(databaseSource, bike.id);

    return Response.json({
        success: true,

        bike: bike && {
            id: bike.id,
            name: bike.name,
            model: bike.model,
            image: bikeImage?.image,

            summary: bikeSummary.map((bikeSummary) => {
                return {
                    key: bikeSummary.key,
                    value: bikeSummary.value
                };
            })
        }
    });
};
