import { getActivitySummaryByBike } from "../../controllers/activities/summary/getActivitySummaryByBike";
import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getBikePrimaryImage } from "../../controllers/bikes/images/getBikePrimaryImage";

export const bikeRequestSchema = {
    params: {
        bikeId: {
            type: "string",
            required: true
        }
    }
};

export async function handleBikeRequest(request: RequestWithKey, env: Env) {
    const { bikeId } = request.params;

    const bike = await getBikeById(env.DATABASE, bikeId);

    if(!bike)
        return Response.json({ success: false });

    const bikeSummary = await getActivitySummaryByBike(env.DATABASE, bike.id);
    const bikeImage = await getBikePrimaryImage(env.DATABASE, bike.id);

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
