import { getDevicesByUser } from "../../controllers/devices/getDevicesByUser";
import { DatabaseSource } from "@ridetracker/authservice";
import { VersionFeatureFlags } from "../../models/FeatureFlags";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export async function handleDevicesRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const devices = await getDevicesByUser(databaseSource, request.key.user);

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
