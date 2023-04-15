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


function registerEndpoints() {
    const router = ThrowableRouter();

    router.post("/api/auth/login", withContent, withSchema(authLoginSchema), handleAuthLoginRequest);
    router.post("/api/auth/login/verify", withContent, withSchema(authLoginVerificationSchema), handleAuthLoginVerificationRequest);
    router.post("/api/auth/register", withContent, withSchema(authRegisterSchema), handleAuthRegisterRequest);
    router.post("/api/auth/renew", withContent, withAuth, handleAuthRenewRequest);
    
    router.get("/api/feed", withAuth, handleFeedRequest);
    
    router.get("/api/bikes", withAuth, handleBikesRequest);
    router.post("/api/bikes", withAuth, withContent, withSchema(createBikeRequestSchema), handleCreateBikeRequest);
    router.post("/api/bikes/:bikeId/images", withAuth, withSchema(uploadBikeImageRequestSchema), handleUploadBikeImageRequest);
    router.post("/api/bikes/:bikeId/images/:imageId/verify", withAuth, withSchema(verifyBikeImageRequestSchema), handleVerifyBikeImageRequest);
    
    router.get("/api/activities/:id", withAuth, withParams, withSchema(activityRequestSchema), handleActivityRequest);
    router.get("/api/activities/:id/comments", withAuth, withParams, withSchema(activityRequestSchema), handleActivityCommentsRequest);
    router.post("/api/activities/:id/comments", withAuth, withParams, withContent, withSchema(activityCreateCommentRequestSchema), handleActivityCreateCommentRequest);
    router.patch("/api/activities/:activityId/comments/:commentId", withAuth, withParams, withContent, withSchema(activityEditCommentRequestSchema), handleActivityEditCommentRequest);
    router.delete("/api/activities/:activityId/comments/:commentId", withAuth, withParams, withSchema(activityDeleteCommentRequestSchema), handleActivityDeleteCommentRequest);

    router.get("/api/profiles/:userId", withAuth, withParams, withSchema(profileRequestSchema), handleProfileRequest);

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
        return router.handle(request, env);
    }
};
