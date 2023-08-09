import { getPlaceGeocoding } from "../../controllers/maps/getPlaceGeocoding";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const mapsGeocodeSchema = {
    query: {
        placeId: {
            type: "string",
            required: true
        }
    }  
};

export async function handleMapsGeocodeRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { placeId } = request.query;

    const result = await getPlaceGeocoding(env.GOOGLE_MAPS_API_TOKEN, placeId);

    if(result.status !== "OK")
        return Response.json({ success: false });

    return Response.json({
        success: true,
        
        places: result.results.map((result) => {
            return {
                address: result.formatted_address,
                placeId: result.geometry.place_id,
                location: {
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                }
            };
        })
    });
};
