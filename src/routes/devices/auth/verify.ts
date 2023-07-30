import { createDevice } from "../../../controllers/devices/createDevice";
import { createDeviceVerification } from "../../../controllers/devices/verifications/createDeviceVerification";
import { deleteDeviceVerification } from "../../../controllers/devices/verifications/deleteDeviceVerification";
import { getDeviceVerification } from "../../../controllers/devices/verifications/getDeviceVerification";
import { createToken } from "../../../controllers/tokens/createToken";
import { VersionFeatureFlags } from "../../../models/FeatureFlags";

export async function handleDeviceAuthVerificationRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, featureFlags: VersionFeatureFlags) {
    const { name, code } = request.content;

    const trimmedCode = code.replace(/[^a-zA-Z0-9]/g, '');

    const date = Date.now();

    const deviceVerification = await getDeviceVerification(env.DATABASE, trimmedCode);

    if(!deviceVerification)
        return Response.json({ success: false, message: "Code is not valid."});

    context.waitUntil(deleteDeviceVerification(env.DATABASE, deviceVerification.id));

    if(date > deviceVerification.expires)
        return Response.json({ success: false, message: "Code has expired."});

    const device = await createDevice(env.DATABASE, deviceVerification.user, name);

    const keyArray = new Uint8Array(64);
    crypto.getRandomValues(keyArray);
    const key = Array.from(keyArray, (decimal) => decimal.toString(16).padStart(2, '0')).join('');
    const token = await createToken(env.DATABASE, btoa(key), "device", device.id);

    if(token === null)
        return Response.json({ success: false, message: "Something went wrong." });

    return Response.json({
        success: true,

        token: {
            key: token.key
        }
    });
};
