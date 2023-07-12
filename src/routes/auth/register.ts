import { createToken } from "../../controllers/tokens/createToken";
import { createUser } from "../../controllers/users/createUser";
import { getUserByEmail } from "../../controllers/users/getUserByEmail";
import { hasUserSubscription } from "../../controllers/users/subscriptions/hasUserSubscription";
import { createUserVerification } from "../../controllers/users/verifications/createUserVerification";
import { sendUserVerificationEmail } from "../../controllers/users/verifications/sendUserVerificationEmail";
import { VersionFeatureFlags } from "../../models/FeatureFlags";
import { encryptPassword } from "../../utils/encryption";

export const authRegisterSchema = {
    content: {
        firstname: {
            type: "string",
            required: true
        },
        
        lastname: {
            type: "string",
            required: true
        },
        
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

export async function handleAuthRegisterRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, featureFlags: VersionFeatureFlags) {
    const { firstname, lastname, email, password } = request.content;

    if(firstname.length < 2 || firstname.length > 128)
        return Response.json({ success: false, message: "Firstname may not be less than 2 character and may not exceed 128 characters." });
        
    if(lastname.length < 2 || lastname.length > 128)
        return Response.json({ success: false, message: "Lastname may not be less than 2 character and may not exceed 128 characters." });

    if(!email.includes('@') || !email.split('@')[1].includes('.') || email.endsWith('.'))
        return Response.json({ success: false, message: "Email does not pass our spam validation, make sure it's a real email." });

    if((await getUserByEmail(env.DATABASE, email)) !== null)
        return Response.json({ success: false, message: "Email is already registered to someone." });

    if(password.length < 3)
        return Response.json({ success: false, message: "Password must be at least 3 characters. We recommend a minimum of 6 characters or longer!" });
    
    const user = await createUser(env.DATABASE, firstname, lastname, email, await encryptPassword(password));

    if(user === null)
        return Response.json({ success: false, message: "Something went wrong!" });

    if(featureFlags.disableUserEmailVerification) {
        const keyArray = new Uint8Array(64);
        crypto.getRandomValues(keyArray);
        const key = Array.from(keyArray, (decimal) => decimal.toString(16).padStart(2, '0')).join('');
        const token = await createToken(env.DATABASE, btoa(key), user.id);
    
        if(token === null)
            return Response.json({ success: false, message: "Something went wrong." });

        const subscribed = await hasUserSubscription(env.DATABASE, user.id);
    
        return Response.json({
            success: true,
            token: {
                key: token.key
            },
            user: {
                id: user.id,
                name: user.firstname + " " + user.lastname,
                avatar: user.avatar,
                subscribed: (subscribed > 0)
            }
        });
    }

    const userVerification = await createUserVerification(env.DATABASE, user);

    if(userVerification === null)
        return Response.json({ success: false, message: "Something went wrong!" });

    if(!user.email.endsWith("ridetracker.app"))
        await sendUserVerificationEmail(user, userVerification);

    return Response.json({
        success: true,
        verification: userVerification.id
    });
};
