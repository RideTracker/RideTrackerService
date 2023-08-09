import { createToken } from "../../controllers/tokens/createToken";
import { deleteToken } from "../../controllers/tokens/deleteToken";
import { getUserById } from "../../controllers/users/getUserById";
import { hasUserSubscription } from "../../controllers/users/subscriptions/hasUserSubscription";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export async function handleAuthRenewRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    await deleteToken(databaseSource, request.key.id);

    const user = await getUserById(databaseSource, request.key.user);
    
    if(!user)
        return Response.json({ success: false });

    if(user.status === "DELETING")
        return Response.json({ success: false });

    const keyArray = new Uint8Array(64);
    crypto.getRandomValues(keyArray);
    const key = Array.from(keyArray, (decimal) => decimal.toString(16).padStart(2, '0')).join('');
    const token = await createToken(databaseSource, btoa(key), "user", user.id);

    if(!token)
        return Response.json({ success: false });

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
};
