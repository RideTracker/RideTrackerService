import getGoogleAuthKey from "../../controllers/google/getGoogleAuthKey";
import { sendMessageEmail } from "../../controllers/messages/sendMessageEmail";
import { createUserSubscription } from "../../controllers/users/subscriptions/createUserSubscription";
import { getUserSubscriptionByToken } from "../../controllers/users/subscriptions/getUserSubscriptionByToken";
import { GoogleSubscriptionPurchase } from "../../models/google/GoogleSubscriptionPurchase";

export const storeSubscriptionRequestSchema = {
    content: {
        token: {
            type: "string",
            required: true
        },
        
        subscription: {
            type: "string",
            required: true
        }
    }  
};

export async function handleStoreSubscriptionRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>) {
    const { token, subscription } = request.content;

    const accessToken = await getGoogleAuthKey(env, [
        "https://www.googleapis.com/auth/androidpublisher"
    ]);

    const response = await fetch(`https://androidpublisher.googleapis.com/androidpublisher/v3/applications/com.norasoderlund.ridetrackerapp/purchases/subscriptions/${subscription}/tokens/${token}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const result = await response.json<GoogleSubscriptionPurchase>();

    if(result.error)
        return Response.json({ success: false });

    const existingSubscription = await getUserSubscriptionByToken(env.DATABASE, token);

    if(existingSubscription)
        return Response.json({ success: false });

    const expires = parseInt(result.expiryTimeMillis) / 1000;

    await createUserSubscription(env.DATABASE, request.key.user, token, subscription, expires);

    return Response.json({
        success: true
    });
};
