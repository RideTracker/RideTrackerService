import { createDevice } from "../../../controllers/devices/createDevice";
import { createDeviceVerification } from "../../../controllers/devices/verifications/createDeviceVerification";
import { deleteDeviceVerification } from "../../../controllers/devices/verifications/deleteDeviceVerification";
import { getDeviceVerification } from "../../../controllers/devices/verifications/getDeviceVerification";
import { createToken } from "../../../controllers/tokens/createToken";
import { DatabaseSource } from "@ridetracker/authservice";
import { VersionFeatureFlags } from "../../../models/FeatureFlags";
import { FeatureFlagsExecution } from "../../../models/FeatureFlagsExecution";

export async function handleDeviceAuthVerificationRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { name, code } = request.content;

    const trimmedCode = code.replace(/[^a-zA-Z0-9]/g, '');

    const date = Date.now();

    const deviceVerification = await getDeviceVerification(databaseSource, trimmedCode);

    if(!deviceVerification)
        return Response.json({ success: false, message: "Code is not valid."});

    context.waitUntil(deleteDeviceVerification(databaseSource, deviceVerification.id));

    if(date > deviceVerification.expires)
        return Response.json({ success: false, message: "Code has expired."});

    const device = await createDevice(databaseSource, deviceVerification.user, name);

    const keyArray = new Uint8Array(64);
    crypto.getRandomValues(keyArray);
    const key = Array.from(keyArray, (decimal) => decimal.toString(16).padStart(2, '0')).join('');
    const token = await createToken(databaseSource, btoa(key), "device", device.id);

    if(token === null)
        return Response.json({ success: false, message: "Something went wrong." });

    return Response.json({
        success: true,

        token: {
            key: token.key
        }
    });
};
