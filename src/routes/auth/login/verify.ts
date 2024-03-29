import { createToken } from "../../../controllers/tokens/createToken";
import { getUserById } from "../../../controllers/users/getUserById";
import { deleteUserVerification } from "../../../controllers/users/verifications/deleteUserVerification";
import { getUserVerification } from "../../../controllers/users/verifications/getUserVerification";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../../models/FeatureFlagsExecution";

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

export async function handleAuthLoginVerificationRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { id, code } = request.content;

    const userVerification = await getUserVerification(databaseSource, id);

    if(userVerification === null)
        return Response.json({ success: false, message: "Something went wrong." });

    const trimmedCode = code.replace(/[^a-zA-Z0-9]/g, '');

    if(trimmedCode !== userVerification.code)
        return Response.json({ success: false, message: "Your credentials do not match." });

    await deleteUserVerification(databaseSource, userVerification);

    const user = await getUserById(databaseSource, userVerification.user);

    if(user === null)
        return Response.json({ success: false, message: "User no longer exists." });

    if(user.status === "DELETING")
        return Response.json({ success: false, message: "User is being deleted." });

    const keyArray = new Uint8Array(64);
    crypto.getRandomValues(keyArray);
    const key = Array.from(keyArray, (decimal) => decimal.toString(16).padStart(2, '0')).join('');
    const token = await createToken(databaseSource, btoa(key), "user", user.id);

    if(token === null)
        return Response.json({ success: false, message: "Something went wrong." });

    return Response.json({
        success: true,
        token: {
            key: token.key
        }
    });
};
