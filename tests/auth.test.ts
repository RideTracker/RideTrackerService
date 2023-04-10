import { assert, describe, expect, test } from "vitest";
import { getResponse } from "./utils/response";
import { getUserByEmail } from "../src/controllers/users/getUserByEmail";

describe("auth", async () => {
    test("register user", async () => {
        const response = await getResponse("POST", "/api/auth/register", {
            firstname: "Nora",
            lastname: "Testlund",
            email: "testlund@ridetracker.app",
            password: "testlund123"
        });

        expect(response.success).toBe(true);

        const codeResponse = await getResponse("POST", "/tests/verification", {
            id: response.verification
        });
    
        const verifyResponse = await getResponse("POST", "/api/auth/login/verify", {
            id: response.verification,
            code: codeResponse.code
        });

        expect(verifyResponse.success).toBe(true);
    });

    let userKey: any = null;
    
    test("login user", async () => {
        const response = await getResponse("POST", "/api/auth/login", {
            email: "testlund@ridetracker.app",
            password: "testlund123"
        });

        expect(response.success).toBe(true);

        const codeResponse = await getResponse("POST", "/tests/verification", {
            id: response.verification
        });
    
        const verifyResponse = await getResponse("POST", "/api/auth/login/verify", {
            id: response.verification,
            code: codeResponse.code
        });

        expect(verifyResponse.success).toBe(true);

        userKey = verifyResponse.key;
    });
    
    test("renew user", async () => {
        const response = await getResponse("POST", "/api/auth/renew", {
            key: userKey
        });

        console.log(response);

        expect(response.success).toBe(true);
    });
});
