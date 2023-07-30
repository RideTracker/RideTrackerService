import { createDevice } from "../../../controllers/devices/createDevice";
import { getDevice } from "../../../controllers/devices/getDevice";
import { createToken } from "../../../controllers/tokens/createToken";
import { deleteToken } from "../../../controllers/tokens/deleteToken";
import { getUserByEmail } from "../../../controllers/users/getUserByEmail";
import { verifyPassword } from "../../../utils/encryption";

export async function handleDeviceAuthLoginRequest(request: RequestWithKey, env: Env) {
    const { name, email, password } = request.content;

    const user = await getUserByEmail(env.DATABASE, email);

    if(user === null)
        return Response.json({ success: false, message: "This email is not registered to anyone." });

    if(user.status === "DELETING")
        return Response.json({ success: false, message: "Your account is being processed to be deleted upon your request."});

    if(!(await verifyPassword(password, user.password)))
        return Response.json({ success: false, message: "Your credentials do not match." });

    const device = await createDevice(env.DATABASE, user.id, name);

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
