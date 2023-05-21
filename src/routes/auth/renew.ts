import { createToken } from "../../controllers/tokens/createToken";
import { deleteToken } from "../../controllers/tokens/deleteToken";
import { getUserById } from "../../controllers/users/getUserById";

export async function handleAuthRenewRequest(request: Request, env: Env) {
    await deleteToken(env.DATABASE, request.key.id);

    const user = await getUserById(env.DATABASE, request.key.user);
    
    if(!user)
        return Response.json({ success: false });

    const token = await createToken(env.DATABASE, crypto.randomUUID(), user.id);

    if(!token)
        return Response.json({ success: false });
        
    return Response.json({
        success: true,
        key: token.id,
        user: {
            id: user.id,
            name: user.firstname + " " + user.lastname,
            avatar: user.avatar
        }
    });
};
