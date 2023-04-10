import { Router } from "itty-router";
import { ThrowableRouter, withContent, withParams } from "itty-router-extras";

import { withSchema } from "./middlewares/schema";

import { authLoginSchema, handleAuthLoginRequest } from "./routes/auth/login";
import { authLoginVerificationSchema, handleAuthLoginVerificationRequest } from "./routes/auth/login/verify";
import { authRegisterSchema, handleAuthRegisterRequest } from "./routes/auth/register";
import { authRenewSchema, handleAuthRenewRequest } from "./routes/auth/renew";
import { withAuth } from "./middlewares/auth";
import { getUserById } from "./controllers/users/getUserById";
import { withStaging } from "./middlewares/staging";
import { getUserVerification } from "./controllers/users/verifications/getUserVerification";


function registerEndpoints() {
    const router = ThrowableRouter();

    router.post("/api/auth/login", withContent, withSchema(authLoginSchema), handleAuthLoginRequest);
    router.post("/api/auth/login/verify", withContent, withSchema(authLoginVerificationSchema), handleAuthLoginVerificationRequest);
    router.post("/api/auth/register", withContent, withSchema(authRegisterSchema), handleAuthRegisterRequest);
    router.post("/api/auth/renew", withContent, withSchema(authRenewSchema), handleAuthRenewRequest);

    router.get("/api/ping", withContent, async (request, env: Env) => {
        return Response.json({
            ping: "pong"
        });
    });

    router.post("/tests/verification", withStaging, withContent, async (request, env: Env) => {
        const { id } = request.content;

        const userVerification = await getUserVerification(env.DATABASE, id);

        if(userVerification === null)
            return Response.json({ success: false, message: "Id doesn't exist." });

        return Response.json({
            code: userVerification.code
        });
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
