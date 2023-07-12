import { ThrowableRouter, withContent, withParams } from "itty-router-extras";

import { withSchema } from "../middlewares/schema";
import { authLoginSchema, handleAuthLoginRequest } from "../routes/auth/login";
import { authLoginVerificationSchema, handleAuthLoginVerificationRequest } from "../routes/auth/login/verify";
import { authRegisterSchema, handleAuthRegisterRequest } from "../routes/auth/register";
import { handleAuthRenewRequest } from "../routes/auth/renew";
import { withAuth } from "../middlewares/auth";
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
import { activitySummaryRequestSchema, handleActivitySummaryRequest } from "../routes/activities/[activityId]/summary";
import { createActivityRequestSchema, handleCreateActivityRequest } from "../routes/activities/create";
import { activityCommentSummaryRequestSchema, handleActivityCommentsSummaryRequest } from "../routes/activities/comments/summary";
import { authLoginVerificationCodeSchema, handleAuthLoginVerificationCodeRequest } from "../routes/auth/login/verification/[verificationId]/code";
import { handleMapsSearchRequest, mapsSearchSchema } from "../routes/maps/search";
import { handleMapsGeocodeRequest, mapsGeocodeSchema } from "../routes/maps/geocode";
import { handleMapsRouteRequest, mapsRouteSchema } from "../routes/maps/route";
import { handleStatusRequest, statusRequestSchema } from "../routes/status";
import { Token } from "../models/token";
import { createMessageRequestSchema, handleCreateMessageRequest } from "../routes/message";
import { handleUserDeletionRequest } from "../routes/user/delete";
import getGoogleAuthKey from "../controllers/google/getGoogleAuthKey";

export default function createRouter() {
    const router = ThrowableRouter();

    // TODO: withContent and withParams should be executed in withSchema, when the schema requires them
    // TODO: this will clean up this file at least

    router.options("*", () => new Response(undefined, { status: 200, statusText: "OK" }));

    router.post("/api/auth/login", withContent, withSchema(authLoginSchema), handleAuthLoginRequest);
    router.post("/api/auth/login/verify", withContent, withSchema(authLoginVerificationSchema), handleAuthLoginVerificationRequest);
    router.get("/api/auth/login/verify/:verificationId/code", withStaging, withParams, withSchema(authLoginVerificationCodeSchema), handleAuthLoginVerificationCodeRequest);
    router.post("/api/auth/register", withContent, withSchema(authRegisterSchema), handleAuthRegisterRequest);
    router.post("/api/auth/renew", withAuth, handleAuthRenewRequest);
    
    router.get("/api/feed", withAuth, withSchema(feedRequestSchema), handleFeedRequest);
    router.get("/api/status", withParams, withSchema(statusRequestSchema), handleStatusRequest);

    router.get("/api/maps/geocode", withAuth, withSchema(mapsGeocodeSchema), handleMapsGeocodeRequest);
    router.get("/api/maps/search", withAuth, withSchema(mapsSearchSchema), handleMapsSearchRequest);
    router.post("/api/maps/routes", withAuth, withContent, withSchema(mapsRouteSchema), handleMapsRouteRequest);
    
    router.get("/api/bikes", withAuth, handleBikesRequest);
    router.post("/api/bikes/create", withAuth, withContent, withSchema(createBikeRequestSchema), handleCreateBikeRequest);
    router.get("/api/bikes/:bikeId", withAuth, withSchema(bikeRequestSchema), handleBikeRequest);
    router.post("/api/bikes/:bikeId/images", withAuth, withSchema(uploadBikeImageRequestSchema), handleUploadBikeImageRequest);
    router.post("/api/bikes/:bikeId/images/:imageId/verify", withAuth, withSchema(verifyBikeImageRequestSchema), handleVerifyBikeImageRequest);
    
    router.post("/api/activities/create", withAuth, withContent, withSchema(createActivityRequestSchema), handleCreateActivityRequest);
    router.get("/api/activities/:id", withAuth, withParams, withSchema(activityRequestSchema), handleActivityRequest);
    router.get("/api/activities/:activityId/summary", withAuth, withParams, withSchema(activitySummaryRequestSchema), handleActivitySummaryRequest);
    router.get("/api/activities/:id/comments", withAuth, withParams, withSchema(activityRequestSchema), handleActivityCommentsRequest);
    router.post("/api/activities/:id/comments", withAuth, withParams, withContent, withSchema(activityCreateCommentRequestSchema), handleActivityCreateCommentRequest);
    router.get("/api/activities/:activityId/comments/summary", withAuth, withParams, withSchema(activityCommentSummaryRequestSchema), handleActivityCommentsSummaryRequest);
    router.patch("/api/activities/:activityId/comments/:commentId", withAuth, withParams, withContent, withSchema(activityEditCommentRequestSchema), handleActivityEditCommentRequest);
    router.delete("/api/activities/:activityId/comments/:commentId", withAuth, withParams, withSchema(activityDeleteCommentRequestSchema), handleActivityDeleteCommentRequest);

    router.get("/api/profiles/:userId", withAuth, withParams, withSchema(profileRequestSchema), handleProfileRequest);
    router.post("/api/profiles/:userId/activities", withAuth, withParams, withContent, withSchema(profileActivitiesRequestSchema), handleProfileActivitiesRequest);
    router.post("/api/profiles/:userId/bikes", withAuth, withParams, withContent, withSchema(profileBikesRequestSchema), handleProfileBikesRequest);
    
    router.post("/api/user/avatar", withAuth, withContent, withSchema(uploadUserImageRequestSchema), handleUploadUserAvatarRequest);
    router.delete("/api/user/delete", withAuth, handleUserDeletionRequest);

    router.post("/api/message", withAuth, withContent, withSchema(createMessageRequestSchema), handleCreateMessageRequest);
    
    router.get("/api/ping", withContent, async (request: RequestWithKey, env: Env) => {
        return Response.json({
            ping: "pong",
            success: true
        });
    });

    router.get("/api/subscription/:subscription/:token", withParams, async (request: RequestWithKey, env: Env) => {
        const { subscription, token } = request.params;

        const accessToken = await getGoogleAuthKey(env);

        const response = await fetch(`https://androidpublisher.googleapis.com/androidpublisher/v3/applications/com.norasoderlund.ridetrackerapp/purchases/subscriptions/${subscription}/tokens/${token}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const result = await response.json();

        return Response.json(result);
    });

    router.post("/staging/register", withStaging, withContent, handleStagingDeleteUserRequest);
    router.post("/staging/verification", withStaging, withContent, handleStagingVerificationRequest);

    router.get("/staging/github", withStaging, async (request: RequestWithKey, env: Env) => {
        return Response.json({ sha: env.GITHUB_SHA });
    });

    router.get("/api/auth/random", withStaging, async (request: RequestWithKey, env: Env) => {
        const token = await env.DATABASE.prepare("SELECT tokens.*, users.email FROM tokens LEFT JOIN users ON users.id = tokens.user WHERE user IS NOT NULL LIMIT 1").first<Token>();

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
