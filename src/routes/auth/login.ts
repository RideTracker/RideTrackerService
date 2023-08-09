import { createUserVerification } from "../../controllers/users/verifications/createUserVerification";
import { getUserByEmail } from "../../controllers/users/getUserByEmail";
import { sendUserVerificationEmail } from "../../controllers/users/verifications/sendUserVerificationEmail";
import { verifyPassword } from "../../utils/encryption";
import { VersionFeatureFlags } from "../../models/FeatureFlags";
import { createToken } from "../../controllers/tokens/createToken";
import { hasUserSubscription } from "../../controllers/users/subscriptions/hasUserSubscription";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";
import DatabaseSource from "../../database/databaseSource";

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

export async function handleAuthLoginRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { email, password } = request.content;

    const user = await getUserByEmail(databaseSource, email);

    if(user === null)
        return Response.json({ success: false, message: "This email is not registered to anyone." });

    if(user.status === "DELETING")
        return Response.json({ success: false, message: "Your account is being processed to be deleted upon your request."});

    if(!(await verifyPassword(password, user.password)))
        return Response.json({ success: false, message: "Your credentials do not match." });

    if(featureFlags.version.disableUserEmailVerification) {
        const keyArray = new Uint8Array(64);
        crypto.getRandomValues(keyArray);
        const key = Array.from(keyArray, (decimal) => decimal.toString(16).padStart(2, '0')).join('');
        const token = await createToken(databaseSource, btoa(key), "user", user.id);
    
        if(token === null)
            return Response.json({ success: false, message: "Something went wrong." });

        const subscribed = await hasUserSubscription(databaseSource, user.id);
    
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

    const userVerification = await createUserVerification(databaseSource, user);

    if(userVerification === null)
        return Response.json({ success: false, message: "Something went wrong." });

    if(!user.email.endsWith("ridetracker.app"))
        await sendUserVerificationEmail(user, userVerification);

    return Response.json({ success: true, verification: userVerification.id });
};
