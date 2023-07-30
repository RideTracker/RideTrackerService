import { createDeviceVerification } from "../../controllers/devices/verifications/createDeviceVerification";
import { VersionFeatureFlags } from "../../models/FeatureFlags";

export async function handleNewDeviceRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, featureFlags: VersionFeatureFlags) {
    const deviceVerification = await createDeviceVerification(env.DATABASE, request.key.user);

    return Response.json({
        success: true,
        
        code: {
            key: deviceVerification.code,
            expires: deviceVerification.expires
        }
    });
};
