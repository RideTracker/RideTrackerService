import { createUserVerification } from "../../controllers/createUserVerification";
import { getUserByEmail } from "../../controllers/getUserByEmail";
import { sendUserVerificationEmail } from "../../controllers/sendUserVerificationEmail";
import { verifyPassword } from "../../utils/encryption";

export const authenticationLoginSchema = {
    content: {
        email: {
            type: "string",
            required: true
        },
        
        password: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthenticationLoginRequest(request: any, env: Env) {
    const { email, password } = request.content;

    const user = await getUserByEmail(env.DATABASE, email);

    if(user === null)
        return Response.json({ success: false, message: "This email is not registered to anyone." });

    if(!(await verifyPassword(password, user.password)))
        return Response.json({ success: false, message: "Your credentials do not match." });

    const userVerification = await createUserVerification(env.DATABASE, user);

    await sendUserVerificationEmail(userVerification);

    return Response.json({ success: true });
};
