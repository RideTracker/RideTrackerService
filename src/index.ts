import { Router } from "itty-router";

import { handlePingRequest } from "./routes/ping";
import { handleUserRequest } from "./routes/user";
import { handleProductRequest } from "./routes/product";

function registerEndpoints() {
    const router = Router();

    router.get("/api/ping", handlePingRequest);
    router.get("/api/user", handleUserRequest);
    router.get("/api/product", handleProductRequest);

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
