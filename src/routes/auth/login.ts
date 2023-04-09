import { createUserVerification } from "../../controllers/users/verifications/createUserVerification";
import { getUserByEmail } from "../../controllers/users/getUserByEmail";
import { sendUserVerificationEmail } from "../../controllers/users/verifications/sendUserVerificationEmail";
import { verifyPassword } from "../../utils/encryption";

export const authLoginSchema = {
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

export async function handleAuthLoginRequest(request: any, env: Env) {
    const { email, password } = request.content;

    const user = await getUserByEmail(env.DATABASE, email);

    if(user === null)
        return Response.json({ success: false, message: "This email is not registered to anyone." });

    if(!(await verifyPassword(password, user.password)))
        return Response.json({ success: false, message: "Your credentials do not match." });

    const userVerification = await createUserVerification(env.DATABASE, user);

    if(userVerification === null)
        return Response.json({ success: false, message: "Something went wrong." });

    await sendUserVerificationEmail(user, userVerification);

    return Response.json({ success: true, verification: userVerification.id });
};
