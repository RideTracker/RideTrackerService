import { getDevice } from "../../../controllers/devices/getDevice";
import { createToken } from "../../../controllers/tokens/createToken";
import { deleteToken } from "../../../controllers/tokens/deleteToken";

export async function handleDeviceAuthRenewRequest(request: RequestWithKey, env: Env) {
    await deleteToken(env.DATABASE, request.key.id);

    const device = await getDevice(env.DATABASE, request.key.user);
    
    if(!device)
        return Response.json({ success: false });

    const keyArray = new Uint8Array(64);
    crypto.getRandomValues(keyArray);
    const key = Array.from(keyArray, (decimal) => decimal.toString(16).padStart(2, '0')).join('');
    const token = await createToken(env.DATABASE, btoa(key), "device", device.id);

    if(!token)
        return Response.json({ success: false });

    return Response.json({
        success: true,
        
        token: {
            key: token.key
        }
    });
};
