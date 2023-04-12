import { getUserById } from "../../controllers/users/getUserById";
import { createUserKey } from "../../controllers/users/keys/createUserKey";
import { deleteUserKey } from "../../controllers/users/keys/deleteUserKey";
import { getUserKeyByCode } from "../../controllers/users/keys/getUserKeyByCode";
import { User } from "../../models/user";

export async function handleAuthProfileRequest(request: Request, env: Env) {
    const user = await getUserById(env.DATABASE, request.key.user) as User;

    return Response.json({
        success: true,

        user: {
            name: user.firstname + " " + user.lastname,
            avatar: user.avatar
        }
    });
};
