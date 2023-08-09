import { ThrowableRouter, withContent, withParams } from "itty-router-extras";
import { DatabaseSource, Token, withAuth } from "@ridetracker/authservice";

import { withSchema } from "../middlewares/schema";
import { authLoginSchema, handleAuthLoginRequest } from "../routes/auth/login";
import { authLoginVerificationSchema, handleAuthLoginVerificationRequest } from "../routes/auth/login/verify";
import { authRegisterSchema, handleAuthRegisterRequest } from "../routes/auth/register";
import { handleAuthRenewRequest } from "../routes/auth/renew";
import { withStaging } from "../middlewares/staging";
import { handleStagingVerificationRequest } from "../routes/staging/getVerificationCode";
import { handleStagingDeleteUserRequest } from "../routes/staging/deleteUser";
import { feedRequestSchema, handleFeedRequest } from "../routes/feed";
import { activityRequestSchema, handleActivityRequest } from "../routes/activities";
import { handleBikesRequest } from "../routes/bikes";
import { handleActivityCommentsRequest } from "../routes/activities/comments";
import { activityCreateCommentRequestSchema, handleActivityCreateCommentRequest } from "../routes/activities/comments/create";
import { activityEditCommentRequestSchema, handleActivityEditCommentRequest } from "../routes/activities/comments/edit";
import { activityDeleteCommentRequestSchema, handleActivityDeleteCommentRequest } from "../routes/activities/comments/delete";
import { createBikeRequestSchema, handleCreateBikeRequest } from "../routes/bikes/create";
import { handleUploadBikeImageRequest, uploadBikeImageRequestSchema } from "../routes/bikes/image";
import { handleVerifyBikeImageRequest, verifyBikeImageRequestSchema } from "../routes/bikes/image/verify";
import { handleProfileRequest, profileRequestSchema } from "../routes/profiles";
import { handleProfileActivitiesRequest, profileActivitiesRequestSchema } from "../routes/profiles/activities";
import { handleProfileBikesRequest, profileBikesRequestSchema } from "../routes/profiles/bikes";
import { handleBikeRequest, bikeRequestSchema } from "../routes/bikes/index";
import { handleUploadUserAvatarRequest, uploadUserImageRequestSchema } from "../routes/user/avatar";
import { createActivityRequestSchema, handleCreateActivityRequest } from "../routes/activities/create";
import { activityCommentSummaryRequestSchema, handleActivityCommentsSummaryRequest } from "../routes/activities/comments/summary";
import { authLoginVerificationCodeSchema, handleAuthLoginVerificationCodeRequest } from "../routes/auth/login/verification/[verificationId]/code";
import { handleMapsSearchRequest, mapsSearchSchema } from "../routes/maps/search";
import { handleMapsGeocodeRequest, mapsGeocodeSchema } from "../routes/maps/geocode";
import { handleMapsRouteRequest, mapsRouteSchema } from "../routes/maps/route";
import { handleStatusRequest, statusRequestSchema } from "../routes/status";
import { createMessageRequestSchema, handleCreateMessageRequest } from "../routes/message";
import { handleUserDeletionRequest } from "../routes/user/delete";
import { handleStoreSubscriptionRequest, storeSubscriptionRequestSchema } from "../routes/store/subscription";
import { handleStoreCouponDevRequest, storeCouponDevRequestSchema } from "../routes/store/coupons/dev";
import { handlePollRequest, pollRequestSchema } from "../routes/polls/[pollId]";
import { handlePollInputAnswerRequest, pollInputAnswerRequestSchema } from "../routes/polls/inputs/[inputId]/answer";
import { handleProfileFollowRequest, profileFollowRequestSchema } from "../routes/profiles/[profileId]/follow";
import { withSubscription } from "../middlewares/subscription";
import { handleStoreProductsRequest } from "../routes/store/products";
import { activityDeleteRequestSchema, handleActivityDeleteRequest } from "../routes/activities/[activityId]/delete";
import { handleUpdateActivityRequest, updateActivityRequestSchema } from "../routes/activities/[activityId]/update";
import { activityCommentRequestSchema, handleActivityCommentRequest } from "../routes/activities/comments/index";
import { handleUserFollowingRequest, userFollowingRequestSchema } from "../routes/user/following";
import { handleUserFollowersRequest, userFollowersRequestSchema } from "../routes/user/followers";
import { createRouteRequestSchema, handleCreateRouteRequest } from "../routes/routes/create";
import { handleUserRoutesRequest, userRoutesRequestSchema } from "../routes/routes/feed/user";
import { handleRoutesFeedRequest, routesFeedRequestSchema } from "../routes/routes/feed";
import { getActivitiesWithoutSummary } from "../controllers/activities/getActivitiesWithoutSummary";
import { handleNewDeviceRequest } from "../routes/devices/new";
import { handleDeviceAuthVerificationRequest } from "../routes/devices/auth/verify";
import { handleDeviceAuthRenewRequest } from "../routes/devices/auth/renew";
import { handleDevicesRequest } from "../routes/devices";
import { handleDeviceAuthLoginRequest } from "../routes/devices/auth/login";
import { FeatureFlagsExecution } from "../models/FeatureFlagsExecution";

export default function createRouter() {
    const router = ThrowableRouter();

    // TODO: withContent and withParams should be executed in withSchema, when the schema requires them
    // TODO: this will clean up this file at least

    router.options("*", () => new Response(undefined, { status: 200, statusText: "OK" }));

    router.post("/api/auth/login", withContent, withSchema(authLoginSchema), handleAuthLoginRequest);
    router.post("/api/auth/login/verify", withContent, withSchema(authLoginVerificationSchema), handleAuthLoginVerificationRequest);
    router.get("/api/auth/login/verify/:verificationId/code", withStaging, withParams, withSchema(authLoginVerificationCodeSchema), handleAuthLoginVerificationCodeRequest);
    router.post("/api/auth/register", withContent, withSchema(authRegisterSchema), handleAuthRegisterRequest);
    router.post("/api/auth/renew", withAuth("user"), handleAuthRenewRequest);
    
    router.post("/api/feed", withAuth("user"), withContent, withSchema(feedRequestSchema), handleFeedRequest);
    router.get("/api/status", withParams, withSchema(statusRequestSchema), handleStatusRequest);

    router.get("/api/maps/geocode", withAuth("user"), withSubscription, withSchema(mapsGeocodeSchema), handleMapsGeocodeRequest);
    router.get("/api/maps/search", withAuth("user"), withSubscription, withSchema(mapsSearchSchema), handleMapsSearchRequest);
    router.post("/api/maps/routes", withAuth("user"), withSubscription, withContent, withSchema(mapsRouteSchema), handleMapsRouteRequest);
    
    router.get("/api/bikes", withAuth("user"), handleBikesRequest);
    router.post("/api/bikes/create", withAuth("user"), withContent, withSchema(createBikeRequestSchema), handleCreateBikeRequest);
    router.get("/api/bikes/:bikeId", withAuth("user"), withSchema(bikeRequestSchema), handleBikeRequest);
    router.post("/api/bikes/:bikeId/images", withAuth("user"), withSchema(uploadBikeImageRequestSchema), handleUploadBikeImageRequest);
    router.post("/api/bikes/:bikeId/images/:imageId/verify", withAuth("user"), withSchema(verifyBikeImageRequestSchema), handleVerifyBikeImageRequest);
    
    router.post("/api/activities/create", withAuth([ "user", "device" ]), withContent, withSchema(createActivityRequestSchema), handleCreateActivityRequest);
    router.get("/api/activities/:id", withAuth("user"), withParams, withSchema(activityRequestSchema), handleActivityRequest);
    router.post("/api/activities/:activityId/update", withAuth("user"), withParams, withContent, withSchema(updateActivityRequestSchema), handleUpdateActivityRequest);
    router.delete("/api/activities/:activityId/delete", withAuth("user"), withParams, withSchema(activityDeleteRequestSchema), handleActivityDeleteRequest);
    router.get("/api/activities/:id/comments", withAuth("user"), withParams, withSchema(activityRequestSchema), handleActivityCommentsRequest);
    router.get("/api/activities/:activityId/comments/summary", withAuth("user"), withParams, withSchema(activityCommentSummaryRequestSchema), handleActivityCommentsSummaryRequest);
    router.get("/api/activities/:id/comments/:commentId", withAuth("user"), withParams, withSchema(activityCommentRequestSchema), handleActivityCommentRequest);
    router.post("/api/activities/:id/comments", withAuth("user"), withParams, withContent, withSchema(activityCreateCommentRequestSchema), handleActivityCreateCommentRequest);
    router.patch("/api/activities/:activityId/comments/:commentId", withAuth("user"), withParams, withContent, withSchema(activityEditCommentRequestSchema), handleActivityEditCommentRequest);
    router.delete("/api/activities/:activityId/comments/:commentId", withAuth("user"), withParams, withSchema(activityDeleteCommentRequestSchema), handleActivityDeleteCommentRequest);

    router.post("/api/routes/create", withAuth("user"), withContent, withSchema(createRouteRequestSchema), handleCreateRouteRequest);
    router.post("/api/routes/feed", withAuth("user"), withContent, withSchema(routesFeedRequestSchema), handleRoutesFeedRequest);
    router.post("/api/routes/feed/user", withAuth("user"), withContent, withSchema(userRoutesRequestSchema), handleUserRoutesRequest);

    router.get("/api/profiles/:userId", withAuth("user"), withParams, withSchema(profileRequestSchema), handleProfileRequest);
    router.post("/api/profiles/:userId/activities", withAuth("user"), withParams, withContent, withSchema(profileActivitiesRequestSchema), handleProfileActivitiesRequest);
    router.post("/api/profiles/:userId/bikes", withAuth("user"), withParams, withContent, withSchema(profileBikesRequestSchema), handleProfileBikesRequest);
    router.post("/api/profiles/:userId/follow", withAuth("user"), withParams, withContent, withSchema(profileFollowRequestSchema), handleProfileFollowRequest);
    
    router.get("/api/polls/:pollId", withAuth("user"), withParams, withSchema(pollRequestSchema), handlePollRequest);
    router.post("/api/polls/:pollId/inputs/:inputId/answer", withAuth("user"), withParams, withContent, withSchema(pollInputAnswerRequestSchema), handlePollInputAnswerRequest);

    router.post("/api/user/avatar", withAuth("user"), withContent, withSchema(uploadUserImageRequestSchema), handleUploadUserAvatarRequest);
    router.post("/api/user/following", withAuth("user"), withContent, withSchema(userFollowingRequestSchema), handleUserFollowingRequest);
    router.post("/api/user/followers", withAuth("user"), withContent, withSchema(userFollowersRequestSchema), handleUserFollowersRequest);
    router.delete("/api/user/delete", withAuth("user"), handleUserDeletionRequest);

    router.get("/api/devices", withAuth("user"), handleDevicesRequest);
    router.get("/api/devices/new", withAuth("user"), handleNewDeviceRequest);
    router.post("/api/devices/auth/verify", withContent, handleDeviceAuthVerificationRequest);
    router.post("/api/devices/auth/login", withContent, handleDeviceAuthLoginRequest);
    router.post("/api/devices/auth/renew", withAuth("device"), withContent, handleDeviceAuthRenewRequest);

    router.post("/api/message", withAuth("user"), withContent, withSchema(createMessageRequestSchema), handleCreateMessageRequest);
    
    router.get("/api/ping", withContent, async (request: RequestWithKey, env: Env) => {
        return Response.json({
            ping: "pong",
            success: true
        });
    });

    router.get("/api/store/products", withAuth("user"), handleStoreProductsRequest);
    router.post("/api/store/subscription", withAuth("user"), withContent, withSchema(storeSubscriptionRequestSchema), handleStoreSubscriptionRequest);
    router.post("/api/store/coupons/dev", withStaging, withAuth("user"), withContent, withSchema(storeCouponDevRequestSchema), handleStoreCouponDevRequest);

    router.post("/staging/register", withStaging, withContent, handleStagingDeleteUserRequest);
    router.post("/staging/verification", withStaging, withContent, handleStagingVerificationRequest);

    router.get("/staging/github", withStaging, async (request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) => {
        return Response.json({ sha: env.GITHUB_SHA });
    });

    router.get("/staging/activities/process", withStaging, async (request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) => {
        const activities = await getActivitiesWithoutSummary(databaseSource);
                
        const durableObjectId = env.ACTIVITY_DURABLE_OBJECT.idFromName("default");
        const durableObject = env.ACTIVITY_DURABLE_OBJECT.get(durableObjectId);

        activities.forEach((activity) => {
            context.waitUntil(durableObject.fetch("https://service.ridetracker.app/scheduled", {
                method: "POST",
                body: JSON.stringify({
                    activityId: activity.id
                })
            }));
        });

        return Response.json({ success: true });
    });

    router.get("/api/auth/random", withStaging, async (request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) => {
        const token = await databaseSource.prepare("SELECT tokens.*, users.email FROM tokens LEFT JOIN users ON users.id = tokens.user WHERE user IS NOT NULL LIMIT 1").first<Token>();

        if(!token)
            return Response.json({ success: false });

        return Response.json({
            success: true,
            email: token.email,
            token: {
                key: token.key
            }
        });
    });

    return router;
}
