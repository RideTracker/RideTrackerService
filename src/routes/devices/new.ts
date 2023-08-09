import { createDeviceVerification } from "../../controllers/devices/verifications/createDeviceVerification";
import { DatabaseSource } from "@ridetracker/authservice";
import { VersionFeatureFlags } from "../../models/FeatureFlags";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export async function handleNewDeviceRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const deviceVerification = await createDeviceVerification(databaseSource, request.key.user);

    return Response.json({
        success: true,
        
        code: {
            key: deviceVerification.code,
            expires: deviceVerification.expires
        }
    });
};
