import { Router } from "itty-router";
import { ThrowableRouter, withContent, withParams } from "itty-router-extras";

import { withSchema } from "./middlewares/schema";

import { authLoginSchema, handleAuthLoginRequest } from "./routes/auth/login";
import { authLoginVerificationSchema, handleAuthLoginVerificationRequest } from "./routes/auth/login/verify";
import { authRegisterSchema, handleAuthRegisterRequest } from "./routes/auth/register";
import { handleAuthRenewRequest } from "./routes/auth/renew";
import { withAuth } from "./middlewares/auth";
import { withStaging } from "./middlewares/staging";
import { handleAuthProfileRequest } from "./routes/auth/profile";
import { handleStagingVerificationRequest } from "./routes/staging/getVerificationCode";
import { handleStagingDeleteUserRequest } from "./routes/staging/deleteUser";
import { handleFeedRequest } from "./routes/feed";
import { activityRequestSchema, handleActivityRequest } from "./routes/activities";
import { handleBikesRequest } from "./routes/bikes";
import { handleActivityCommentsRequest } from "./routes/activities/comments";
import { activityCreateCommentRequestSchema, handleActivityCreateCommentRequest } from "./routes/activities/comments/create";


function registerEndpoints() {
    const router = ThrowableRouter();

    router.post("/api/auth/login", withContent, withSchema(authLoginSchema), handleAuthLoginRequest);
    router.post("/api/auth/login/verify", withContent, withSchema(authLoginVerificationSchema), handleAuthLoginVerificationRequest);
    router.post("/api/auth/register", withContent, withSchema(authRegisterSchema), handleAuthRegisterRequest);
    router.post("/api/auth/renew", withContent, withAuth, handleAuthRenewRequest);
    router.get("/api/auth/profile", withContent, withAuth, handleAuthProfileRequest);
    
    router.get("/api/feed", withAuth, handleFeedRequest);
    
    router.get("/api/bikes", withAuth, handleBikesRequest);
    
    router.get("/api/activities/:id", withAuth, withParams, withSchema(activityRequestSchema), handleActivityRequest);
    router.get("/api/activities/:id/comments", withAuth, withParams, withSchema(activityRequestSchema), handleActivityCommentsRequest);
    router.post("/api/activities/:id/comments/create", withAuth, withParams, withContent, withSchema(activityCreateCommentRequestSchema), handleActivityCreateCommentRequest);

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
