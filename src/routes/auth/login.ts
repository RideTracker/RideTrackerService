import { createUserVerification } from "../../controllers/users/verifications/createUserVerification";
import { getUserByEmail } from "../../controllers/users/getUserByEmail";
import { sendUserVerificationEmail } from "../../controllers/users/verifications/sendUserVerificationEmail";
import { verifyPassword } from "../../utils/encryption";
import { VersionFeatureFlags } from "../../models/FeatureFlags";
import { createToken } from "../../controllers/tokens/createToken";

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

export async function handleAuthLoginRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, featureFlags: VersionFeatureFlags) {
    const { email, password } = request.content;

    const user = await getUserByEmail(env.DATABASE, email);

    if(user === null)
        return Response.json({ success: false, message: "This email is not registered to anyone." });

    if(!(await verifyPassword(password, user.password)))
        return Response.json({ success: false, message: "Your credentials do not match." });

    if(featureFlags.disableUserEmailVerification) {
        const keyArray = new Uint8Array(64);
        crypto.getRandomValues(keyArray);
        const key = Array.from(keyArray, (decimal) => decimal.toString(16).padStart(2, '0')).join('');
        const token = await createToken(env.DATABASE, btoa(key), user.id);
    
        if(token === null)
            return Response.json({ success: false, message: "Something went wrong." });
    
        return Response.json({
            success: true,
            token: {
                key: token.key
            }
        });
    }

    const userVerification = await createUserVerification(env.DATABASE, user);

    if(userVerification === null)
        return Response.json({ success: false, message: "Something went wrong." });

    if(!user.email.endsWith("ridetracker.app"))
        await sendUserVerificationEmail(user, userVerification);

    return Response.json({ success: true, verification: userVerification.id });
};
