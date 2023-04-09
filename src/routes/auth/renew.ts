import { getUserById } from "../../controllers/users/getUserById";
import { createUserKey } from "../../controllers/users/keys/createUserKey";
import { deleteUserKey } from "../../controllers/users/keys/deleteUserKey";
import { getUserKeyByCode } from "../../controllers/users/keys/getUserKeyByCode";

export const authRenewSchema = {
    content: {
        key: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthRenewRequest(request: any, env: Env) {
    const { key } = request.content;

    let userKey = await getUserKeyByCode(env.DATABASE, key);

    if(userKey === null)
        return Response.json({ success: false });

    await deleteUserKey(env.DATABASE, userKey);

    const user = await getUserById(env.DATABASE, userKey.user);

    if(user === null)
        return Response.json({ success: false });

    userKey = await createUserKey(env.DATABASE, user);

    return Response.json({ success: true, key: userKey.id });
};
