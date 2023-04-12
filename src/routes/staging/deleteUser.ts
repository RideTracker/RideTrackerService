import { deleteUser } from "../../controllers/users/deleteUser";
import { getUserByEmail } from "../../controllers/users/getUserByEmail";

export async function handleStagingDeleteUserRequest(request: Request, env: Env) {
    const { email } = request.content;

    const user = await getUserByEmail(env.DATABASE, email);

    if(user === null)
        return Response.json({ success: true });

    await deleteUser(env.DATABASE, user);

    return Response.json({ success: true });
};
