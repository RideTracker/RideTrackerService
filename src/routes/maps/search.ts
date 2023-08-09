import { getMapsSearchPredictions } from "../../controllers/maps/getMapsSearchPredictions";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const mapsSearchSchema = {
    query: {
        search: {
            type: "string",
            required: true
        }
    }  
};

export async function handleMapsSearchRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { search } = request.query;

    const result = await getMapsSearchPredictions(env, search);

    if(result.status !== "OK")
        return Response.json({ success: false });

    return Response.json({
        success: true,
        
        predictions: result.predictions
    });
};
