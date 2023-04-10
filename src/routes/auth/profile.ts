import { getUserById } from "../../controllers/users/getUserById";
import { createUserKey } from "../../controllers/users/keys/createUserKey";
import { deleteUserKey } from "../../controllers/users/keys/deleteUserKey";
import { getUserKeyByCode } from "../../controllers/users/keys/getUserKeyByCode";
import { User } from "../../models/user";

export async function handleAuthProfileRequest(request: any, env: Env) {
    const user = await getUserById(env.DATABASE, request.userId) as User;

    return Response.json({
        success: true,

        user: {
            name: user.firstname + " " + user.lastname,
            avatar: user.avatar
        }
    });
};
