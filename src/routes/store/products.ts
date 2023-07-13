import getGoogleAuthKey from "../../controllers/google/getGoogleAuthKey";
import { sendMessageEmail } from "../../controllers/messages/sendMessageEmail";
import deleteStoreCoupon from "../../controllers/store/coupons/deleteStoreCoupon";
import getStoreCouponByToken from "../../controllers/store/coupons/getStoreCouponByToken";
import { createUserSubscription } from "../../controllers/users/subscriptions/createUserSubscription";
import { getUserSubscriptionByToken } from "../../controllers/users/subscriptions/getUserSubscriptionByToken";
import { VersionFeatureFlags } from "../../models/FeatureFlags";
import { GoogleSubscriptionPurchase } from "../../models/google/GoogleSubscriptionPurchase";

export async function handleStoreProductsRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, versionFeatureFlags: VersionFeatureFlags) {
    if(versionFeatureFlags.disableSubscriptions) {
        return Response.json({
            success: false,
            message: "Subscriptions are disabled currently."
        });
    }

    return Response.json({
        success: true,

        products: [ "subscription_monthly", "subscription_quartely" ]
    });
};
