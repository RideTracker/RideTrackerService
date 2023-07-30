import { getDevicesByUser } from "../../controllers/devices/getDevicesByUser";
import { VersionFeatureFlags } from "../../models/FeatureFlags";

export async function handleDevicesRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, featureFlags: VersionFeatureFlags) {
    const devices = await getDevicesByUser(env.DATABASE, request.key.user);

    return Response.json({
        success: true,
        
        devices: devices.map((device) => {
            return {
                id: device.id,

                name: device.name
            };
        })
    });
};
