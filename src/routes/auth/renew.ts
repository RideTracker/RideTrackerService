import { createToken } from "../../controllers/tokens/createToken";
import { deleteToken } from "../../controllers/tokens/deleteToken";
import { getUserById } from "../../controllers/users/getUserById";

export async function handleAuthRenewRequest(request: RequestWithKey, env: Env) {
    await deleteToken(env.DATABASE, request.key.id);

    const user = await getUserById(env.DATABASE, request.key.user);
    
    if(!user)
        return Response.json({ success: false });

    const keyArray = new Uint8Array(64);
    crypto.getRandomValues(keyArray);
    const key = Array.from(keyArray, (decimal) => decimal.toString(16).padStart(2, '0')).join('');
    const token = await createToken(env.DATABASE, btoa(key), user.id);

    if(!token)
        return Response.json({ success: false });
        
    return Response.json({
        success: true,
        key: token.key,
        user: {
            id: user.id,
            name: user.firstname + " " + user.lastname,
            avatar: user.avatar
        }
    });
};
