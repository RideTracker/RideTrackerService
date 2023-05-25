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
import { feedRequestSchema, handleFeedRequest } from "./routes/feed";
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
import { activityCommentSummaryRequestSchema, handleActivityCommentsSummaryRequest } from "./routes/activities/comments/summary";
import { authLoginVerificationCodeSchema, handleAuthLoginVerificationCodeRequest } from "./routes/auth/login/verification/[verificationId]/code";
import { triggerAlarm } from "./controllers/alarms/triggerAlarm";

function registerEndpoints() {
    const router = ThrowableRouter();

    // TODO: withContent and withParams should be executed in withSchema, when the schema requires them
    // TODO: this will clean up this file at least

    router.options("*", () => new Response(undefined, { status: 200, statusText: "OK" }));

    router.post("/api/auth/login", withContent, withSchema(authLoginSchema), handleAuthLoginRequest);
    router.post("/api/auth/login/verify", withContent, withSchema(authLoginVerificationSchema), handleAuthLoginVerificationRequest);
    router.get("/api/auth/login/verify/:verificationId/code", withStaging, withParams, withSchema(authLoginVerificationCodeSchema), handleAuthLoginVerificationCodeRequest);
    router.post("/api/auth/register", withContent, withSchema(authRegisterSchema), handleAuthRegisterRequest);
    router.post("/api/auth/renew", withContent, withAuth, handleAuthRenewRequest);
    
    router.get("/api/avatars", withAuth, handleAvatarsRequest);
    router.post("/api/avatars", withStaging, withAuth, withContent, handleCreateAvatarRequest);
    router.post("/api/avatars/:avatarId/color", withStaging, withAuth, withParams, withContent, handleCreateAvatarColorRequest);
    router.post("/api/avatars/:avatarId/image", withStaging, withAuth, withParams, withContent, handleCreateAvatarImageRequest);

    router.get("/api/feed", withAuth, withSchema(feedRequestSchema), handleFeedRequest);
    
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
    router.get("/api/activities/:activityId/comments/summary", withAuth, withParams, withSchema(activityCommentSummaryRequestSchema), handleActivityCommentsSummaryRequest);
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

    router.get("/staging/user", withStaging, async (request: Request, env: Env) => {
        return Response.json({
            key: await env.DATABASE.prepare("SELECT * FROM user_keys").first<string>("id")
        });
    });

    return router;
};

console.log("Registering the router endpoints...");

const router = registerEndpoints();

console.log("Listening to requests...");

async function handleRequest(request: any, env: any, context: any) {
    const timestamp = Date.now();

    const response: Response = await router.handle(request, env);

    if(!response) {
        
        return new Response(undefined, {
            status: 404,
            statusText: "File Not Found"
        })
    }

    const elapsed = Date.now() - timestamp;

    if(elapsed >= 9)
        console.log(`Warning, request took ${elapsed}ms to execute`, request);

    return response;
}

export default {
    async fetch(request: any, env: any, context: any) {
        try {
            const response = await handleRequest(request, env, context);

            if(response.status >= 200 && response.status <= 299) { 
                response.headers.set("Access-Control-Allow-Origin", "*");
                response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
                response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            }
            else
                context.waitUntil(triggerAlarm(env, "Unsuccessful Status Code Alarm", `A response has returned an unsuccessfull status code.\n \n\`\`\`\n${response.status} ${response.statusText}\n\`\`\`\nRequest: ${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`));
            
            return response;
        }
        catch(error) {
            context.waitUntil(triggerAlarm(env, "Uncaught Error Alarm", `An uncaught error was thrown during a response.\n \n\`\`\`\n${error}\n\`\`\`\nRequest: ${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`));
            
            return new Response(undefined, {
                status: 500,
                statusText: "Internal Server Error"
            })
        }
    }
};
