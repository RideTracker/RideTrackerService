import { getUserById } from "../../controllers/users/getUserById";
import { createUserKey } from "../../controllers/users/keys/createUserKey";
import { deleteUserKey } from "../../controllers/users/keys/deleteUserKey";
import { getUserKeyByCode } from "../../controllers/users/keys/getUserKeyByCode";
import { getUserKeyById } from "../../controllers/users/keys/getUserKeyById";
import { User } from "../../models/user";

export const authRenewSchema = {
    content: {
        key: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthRenewRequest(request: any, env: Env) {
    let userKey = await getUserKeyById(env.DATABASE, request.userKey);
    
    if(userKey === null)
        return Response.json({ success: false });

    await deleteUserKey(env.DATABASE, userKey);

    const user = await getUserById(env.DATABASE, request.userId) as User;
    
    if(user === null)
        return Response.json({ success: false });

    userKey = await createUserKey(env.DATABASE, user);

    if(userKey === null)
        return Response.json({ success: false });
        
    return Response.json({ success: true, key: userKey.id });
};
