import { getBikeById } from "../../controllers/bikes/getBikeById";
import { getBikeSummaryById } from "../../controllers/bikes/summary/getBikeSummaryById";

export const bikeRequestSchema = {
    params: {
        bikeId: {
            type: "string",
            required: true
        }
    }
};

export async function handleBikeRequest(request: Request, env: Env) {
    const { bikeId } = request.params;

    const bike = await getBikeById(env.DATABASE, bikeId);

    if(!bike)
        return Response.json({ success: false });

    const bikeSummary = (bike) && await getBikeSummaryById(env.DATABASE, bike.id);

    return Response.json({
        success: true,

        bike: bike && {
            id: bike.id,
            name: bike.name,
            model: bike.model,
            image: bike.image,

            summary: bikeSummary && {
                rides: bikeSummary.rides,
                distance: bikeSummary.distance,
                elevation: bikeSummary.elevation
            }
        }
    });
};