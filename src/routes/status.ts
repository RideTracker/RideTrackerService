import { VersionFeatureFlags } from "../models/FeatureFlags";

export const statusRequestSchema = {
    query: {
        device: {
            type: "string",
            required: true
        }
    }  
};

export async function handleStatusRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, featureFlags: VersionFeatureFlags) {
    const { device } = request.query;

    return Response.json({
        success: true,

        status: featureFlags.status,
        supersededBy: featureFlags.platforms?.[device]?.supersededBy ?? null
    });
};
