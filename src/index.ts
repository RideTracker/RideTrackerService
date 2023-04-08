import { Router } from "itty-router";
import { ThrowableRouter, withContent, withParams } from "itty-router-extras";

import { withSchema } from "./middlewares/schema";

import { authenticationRegisterSchema, handleAuthenticationRegisterRequest } from "./routes/authentication/register";
import { authenticationLoginSchema, handleAuthenticationLoginRequest } from "./routes/authentication/login";
import { authenticationRenewSchema, handleAuthenticationRenewRequest } from "./routes/authentication/renew";

function registerEndpoints() {
    const router = ThrowableRouter();

    router.post("/api/auth/login", withContent, withSchema(authenticationLoginSchema), handleAuthenticationLoginRequest);
    router.post("/api/auth/register", withContent, withSchema(authenticationRegisterSchema), handleAuthenticationRegisterRequest);
    router.post("/api/auth/renew", withContent, withSchema(authenticationRenewSchema), handleAuthenticationRenewRequest);

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
