import getGoogleAuthKey from "../../controllers/google/getGoogleAuthKey";
import { sendMessageEmail } from "../../controllers/messages/sendMessageEmail";
import deleteStoreCoupon from "../../controllers/store/coupons/deleteStoreCoupon";
import getStoreCouponByToken from "../../controllers/store/coupons/getStoreCouponByToken";
import { createUserSubscription } from "../../controllers/users/subscriptions/createUserSubscription";
import { getUserSubscriptionByToken } from "../../controllers/users/subscriptions/getUserSubscriptionByToken";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";
import { GoogleSubscriptionPurchase } from "../../models/google/GoogleSubscriptionPurchase";

export const storeSubscriptionRequestSchema = {
    content: {
        token: {
            type: "string",
            required: true
        },
        
        subscription: {
            type: "string",
            required: false
        }
    }  
};

export async function handleStoreSubscriptionRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { token, subscription } = request.content;

    const existingSubscription = await getUserSubscriptionByToken(databaseSource, token);

    if(existingSubscription)
        return Response.json({ success: false });

    const coupon = await getStoreCouponByToken(databaseSource, token);

    if(coupon) {
        await createUserSubscription(databaseSource, request.key.user, coupon.token, coupon.product, Date.now() + coupon.duration);

        await deleteStoreCoupon(databaseSource, coupon.id);
    }
    else if(subscription) {
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

        const expires = parseInt(result.expiryTimeMillis);

        await createUserSubscription(databaseSource, request.key.user, token, subscription, expires);
    }
    else
        return Response.json({ succcess: false });

    return Response.json({
        success: true
    });
};
