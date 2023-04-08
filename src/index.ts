import { Router } from "itty-router";
import { ThrowableRouter, withContent, withParams } from "itty-router-extras";

import { withSchema } from "./middlewares/schema";

import { authenticationRegisterSchema, handleAuthenticationRegisterRequest } from "./routes/authentication/register";

function registerEndpoints() {
    const router = ThrowableRouter();

    router.post("/api/user/authentication/register", withContent, withSchema(authenticationRegisterSchema), handleAuthenticationRegisterRequest);

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
