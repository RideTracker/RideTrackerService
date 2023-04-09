import { deleteUserVerification } from "../../../controllers/users/verifications/deleteUserVerification";
import { getUserVerification } from "../../../controllers/users/verifications/getUserVerification";

export const authenticationLoginVerificationSchema = {
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

export async function handleAuthenticationLoginVerificationRequest(request: any, env: Env) {
    const { id, code } = request.content;

    const userVerification = await getUserVerification(env.DATABASE, id);

    if(userVerification === null)
        return Response.json({ success: false, message: "Something went wrong." });

    const trimmedCode = code.replace(/[^a-zA-Z0-9]/g, '');

    if(trimmedCode !== userVerification.code)
        return Response.json({ success: false, message: "Your credentials do not match." });

    await deleteUserVerification(env.DATABASE, userVerification);

    return Response.json({ success: true });
};
