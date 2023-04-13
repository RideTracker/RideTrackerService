import { getBikesByUser } from "../controllers/bikes/getBikeByUser";
import { getBikeSummaryById } from "../controllers/bikes/summary/getBikeSummaryById";

export async function handleBikesRequest(request: Request, env: Env) {
    const bikes = await getBikesByUser(env.DATABASE, request.key.user);

    if(!bikes)
        return Response.json({ success: false });

    const bikeSummaries = await Promise.all(bikes.map((bike) => {
        return getBikeSummaryById(env.DATABASE, bike.id);
    }));

    return Response.json({
        success: true,

        bikes: bikes.map((bike) => {
            const bikeSummary = bikeSummaries.find((summary) => summary?.id === bike.id);

            return {
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
        })
    });
};
