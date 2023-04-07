import { Router } from "itty-router";

import { handlePingRequest } from "./routes/ping";
import { handleUserRequest } from "./routes/user";
import { handleProductRequest } from "./routes/product";

function registerEndpoints() {
    const router = Router({ base: "/api" });

    router.get("/ping", handlePingRequest);
    router.get("/user", handleUserRequest);
    router.get("/product", handleProductRequest);

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
