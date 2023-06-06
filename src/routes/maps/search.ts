import { getMapsSearchPredictions } from "../../controllers/maps/getMapsSearchPredictions";

export const mapsSearchSchema = {
    query: {
        search: {
            type: "string",
            required: true
        }
    }  
};

export async function handleMapsSearchRequest(request: Request, env: Env) {
    const { query } = request.query;

    const result = await getMapsSearchPredictions(env, query);

    if(result.status !== "OK")
        return Response.json({ success: false });

    return Response.json({
        success: true,
        
        predictions: result.predictions
    });
};
