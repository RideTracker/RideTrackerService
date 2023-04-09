import { getUserById } from "../../controllers/users/getUserById";
import { createUserKey } from "../../controllers/users/keys/createUserKey";
import { deleteUserKey } from "../../controllers/users/keys/deleteUserKey";
import { getUserKeyByCode } from "../../controllers/users/keys/getUserKeyByCode";

export const authRenewSchema = {
    content: {
        id: {
            type: "string",
            required: true
        },
        
        code: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthRenewRequest(request: any, env: Env) {
    const { id, code } = request.content;

    const user = await getUserById(env.DATABASE, id);

    if(user === null)
        return Response.json({ success: false });

    let userKey = await getUserKeyByCode(env.DATABASE, user, code);

    if(userKey === null)
        return Response.json({ success: false });

    await deleteUserKey(env.DATABASE, userKey);

    userKey = await createUserKey(env.DATABASE, user);

    return Response.json({ success: true, code: userKey.id });
};
