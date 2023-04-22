import { Router } from "itty-router";
import { ThrowableRouter, withContent, withParams } from "itty-router-extras";

import { withSchema } from "./middlewares/schema";

import { authLoginSchema, handleAuthLoginRequest } from "./routes/auth/login";
import { authLoginVerificationSchema, handleAuthLoginVerificationRequest } from "./routes/auth/login/verify";
import { authRegisterSchema, handleAuthRegisterRequest } from "./routes/auth/register";
import { handleAuthRenewRequest } from "./routes/auth/renew";
import { withAuth } from "./middlewares/auth";
import { withStaging } from "./middlewares/staging";
import { handleStagingVerificationRequest } from "./routes/staging/getVerificationCode";
import { handleStagingDeleteUserRequest } from "./routes/staging/deleteUser";
import { handleFeedRequest } from "./routes/feed";
import { activityRequestSchema, handleActivityRequest } from "./routes/activities";
import { handleBikesRequest } from "./routes/bikes";
import { handleActivityCommentsRequest } from "./routes/activities/comments";
import { activityCreateCommentRequestSchema, handleActivityCreateCommentRequest } from "./routes/activities/comments/create";
import { activityEditCommentRequestSchema, handleActivityEditCommentRequest } from "./routes/activities/comments/edit";
import { activityDeleteCommentRequestSchema, handleActivityDeleteCommentRequest } from "./routes/activities/comments/delete";
import { createBikeRequestSchema, handleCreateBikeRequest } from "./routes/bikes/create";
import { handleUploadBikeImageRequest, uploadBikeImageRequestSchema } from "./routes/bikes/image";
import { handleVerifyBikeImageRequest, verifyBikeImageRequestSchema } from "./routes/bikes/image/verify";
import { handleProfileRequest, profileRequestSchema } from "./routes/profiles";
import { handleProfileActivitiesRequest, profileActivitiesRequestSchema } from "./routes/profiles/activities";
import { handleProfileBikesRequest, profileBikesRequestSchema } from "./routes/profiles/bikes";
import { handleBikeRequest, bikeRequestSchema } from "./routes/bikes/index";
import { handleAvatarsRequest } from "./routes/avatars";
import { handleCreateAvatarRequest } from "./routes/avatars/create";
import { handleCreateAvatarColorRequest } from "./routes/avatars/avatar/color";
import { handleCreateAvatarImageRequest } from "./routes/avatars/avatar/image";
import { handleUploadUserAvatarRequest, uploadUserImageRequestSchema } from "./routes/user/avatar";
import { activitySummaryRequestSchema, handleActivitySummaryRequest } from "./routes/activities/[activityId]/summary";
import { createActivityRequestSchema, handleCreateActivityRequest } from "./routes/activities/create";

function registerEndpoints() {
    const router = ThrowableRouter();

    router.post("/api/auth/login", withContent, withSchema(authLoginSchema), handleAuthLoginRequest);
    router.post("/api/auth/login/verify", withContent, withSchema(authLoginVerificationSchema), handleAuthLoginVerificationRequest);
    router.post("/api/auth/register", withContent, withSchema(authRegisterSchema), handleAuthRegisterRequest);
    router.post("/api/auth/renew", withContent, withAuth, handleAuthRenewRequest);
    
    router.get("/api/avatars", withAuth, handleAvatarsRequest);
    router.post("/api/avatars", withStaging, withAuth, withContent, handleCreateAvatarRequest);
    router.post("/api/avatars/:avatarId/color", withStaging, withAuth, withParams, withContent, handleCreateAvatarColorRequest);
    router.post("/api/avatars/:avatarId/image", withStaging, withAuth, withParams, withContent, handleCreateAvatarImageRequest);

    router.get("/api/feed", withAuth, handleFeedRequest);
    
    router.get("/api/bikes", withAuth, handleBikesRequest);
    router.post("/api/bikes", withAuth, withContent, withSchema(createBikeRequestSchema), handleCreateBikeRequest);
    router.get("/api/bikes/:bikeId", withAuth, withSchema(bikeRequestSchema), handleBikeRequest);
    router.post("/api/bikes/:bikeId/images", withAuth, withSchema(uploadBikeImageRequestSchema), handleUploadBikeImageRequest);
    router.post("/api/bikes/:bikeId/images/:imageId/verify", withAuth, withSchema(verifyBikeImageRequestSchema), handleVerifyBikeImageRequest);
    
    router.post("/api/activities/create", withAuth, withContent, withSchema(createActivityRequestSchema), handleCreateActivityRequest);
    router.get("/api/activities/:id", withAuth, withParams, withSchema(activityRequestSchema), handleActivityRequest);
    router.get("/api/activities/:activityId/summary", withAuth, withParams, withSchema(activitySummaryRequestSchema), handleActivitySummaryRequest);
    router.get("/api/activities/:id/comments", withAuth, withParams, withSchema(activityRequestSchema), handleActivityCommentsRequest);
    router.post("/api/activities/:id/comments", withAuth, withParams, withContent, withSchema(activityCreateCommentRequestSchema), handleActivityCreateCommentRequest);
    router.patch("/api/activities/:activityId/comments/:commentId", withAuth, withParams, withContent, withSchema(activityEditCommentRequestSchema), handleActivityEditCommentRequest);
    router.delete("/api/activities/:activityId/comments/:commentId", withAuth, withParams, withSchema(activityDeleteCommentRequestSchema), handleActivityDeleteCommentRequest);

    router.get("/api/profiles/:userId", withAuth, withParams, withSchema(profileRequestSchema), handleProfileRequest);
    router.post("/api/profiles/:userId/activities", withAuth, withParams, withContent, withSchema(profileActivitiesRequestSchema), handleProfileActivitiesRequest);
    router.post("/api/profiles/:userId/bikes", withAuth, withParams, withContent, withSchema(profileBikesRequestSchema), handleProfileBikesRequest);
    
    router.post("/api/user/avatar", withAuth, withContent, withSchema(uploadUserImageRequestSchema), handleUploadUserAvatarRequest);
    
    router.get("/api/ping", withContent, async (request: Request, env: Env) => {
        return Response.json({
            ping: "pong"
        });
    });

    router.post("/staging/register", withStaging, withContent, handleStagingDeleteUserRequest);
    router.post("/staging/verification", withStaging, withContent, handleStagingVerificationRequest);

    router.get("/staging/github", withStaging, async (request: Request, env: Env) => {
        return Response.json({ sha: env.GITHUB_SHA });
    });

    return router;
};

console.log("Registering the router endpoints...");

const router = registerEndpoints();

console.log("Listening to requests...");

export default {
    async fetch(request: any, env: any) {
        const timestamp = Date.now();

        const response = router.handle(request, env);

        const elapsed = Date.now() - timestamp;

        if(elapsed >= 9)
            console.log(`Warning, request took ${elapsed}ms to execute`, request);

        return response;
    }
};
