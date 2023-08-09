import { DatabaseSource } from "@ridetracker/authservice";
import { VersionFeatureFlags } from "../models/FeatureFlags";
import { FeatureFlagsExecution } from "../models/FeatureFlagsExecution";

export const statusRequestSchema = {
    query: {
        device: {
            type: "string",
            required: true
        }
    }  
};

export async function handleStatusRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { device } = request.query;

    return Response.json({
        success: true,

        status: featureFlags.version.status,
        supersededBy: featureFlags.version.platforms?.[device]?.supersededBy ?? null
    });
};
