import { getUserById } from "../../controllers/users/getUserById";
import { createUserKey } from "../../controllers/users/keys/createUserKey";
import { deleteUserKey } from "../../controllers/users/keys/deleteUserKey";
import { getUserKeyByCode } from "../../controllers/users/keys/getUserKeyByCode";
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
    await deleteUserKey(env.DATABASE, request.userKey);

    const user = await getUserById(env.DATABASE, request.userId) as User;

    const userKey = await createUserKey(env.DATABASE, user);

    return Response.json({ success: true, key: userKey.id });
};
