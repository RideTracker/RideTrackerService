import { getUserById } from "../../controllers/users/getUserById";
import { createUserKey } from "../../controllers/users/keys/createUserKey";
import { deleteUserKey } from "../../controllers/users/keys/deleteUserKey";
import { getUserKeyByCode } from "../../controllers/users/keys/getUserKeyByCode";
import { getUserKeyById } from "../../controllers/users/keys/getUserKeyById";
import { User } from "../../models/user";

export async function handleAuthRenewRequest(request: Request, env: Env) {
    await deleteUserKey(env.DATABASE, request.key);

    const user = await getUserById(env.DATABASE, request.key.user);
    
    if(!user)
        return Response.json({ success: false });

    const userKey = await createUserKey(env.DATABASE, user);

    if(!userKey)
        return Response.json({ success: false });
        
    return Response.json({ success: true, key: userKey.id });
};
