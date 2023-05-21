import { createToken } from "../../../controllers/tokens/createToken";
import { getUserById } from "../../../controllers/users/getUserById";
import { deleteUserVerification } from "../../../controllers/users/verifications/deleteUserVerification";
import { getUserVerification } from "../../../controllers/users/verifications/getUserVerification";

export const authLoginVerificationSchema = {
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

export async function handleAuthLoginVerificationRequest(request: Request, env: Env) {
    const { id, code } = request.content;

    const userVerification = await getUserVerification(env.DATABASE, id);

    if(userVerification === null)
        return Response.json({ success: false, message: "Something went wrong." });

    const trimmedCode = code.replace(/[^a-zA-Z0-9]/g, '');

    if(trimmedCode !== userVerification.code)
        return Response.json({ success: false, message: "Your credentials do not match." });

    await deleteUserVerification(env.DATABASE, userVerification);

    const user = await getUserById(env.DATABASE, userVerification.user);

    if(user === null)
        return Response.json({ success: false, message: "User no longer exists." });

    const token = await createToken(env.DATABASE, crypto.randomUUID(), user.id);

    if(token === null)
        return Response.json({ success: false, message: "Something went wrong." });

    return Response.json({ success: true, key: token.key });
};
