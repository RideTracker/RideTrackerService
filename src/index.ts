import { Router } from "itty-router";

import { handlePingRequest } from "./routes/ping";
import { handleUserRequest } from "./routes/user";
import { handleProductRequest } from "./routes/product";

const router = Router({ base: "/api" });

router.get("/ping", handlePingRequest);
router.get("/user", handleUserRequest);
router.get("/product", handleProductRequest);

export default {
    async fetch(request: any) {
        return router.handle(request);
    }
};
