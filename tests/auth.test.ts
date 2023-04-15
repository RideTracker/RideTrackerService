import { assert, describe, expect, test } from "vitest";
import { getResponse } from "./utils/response";

// @ts-ignore
if(import.meta.env.VITE_GITHUB_SHA) {
    describe("github", async () => {
        test("verifying github sha", async () => {
            while(true) {
                try {
                    const response = await getResponse("GET", "/staging/github", null);

                    // @ts-ignore
                    if(response.sha === import.meta.env.VITE_GITHUB_SHA)
                        break;

                    await new Promise((resolve) => setTimeout(resolve, 5000));
                }
                catch {
                    continue;
                }
            }
        }, 60000);
    });
}

describe("auth", async () => {
    test("preparing database", async () => {
        await getResponse("POST", "/staging/register", null, {
            email: "testlund@ridetracker.app"
        });
    });

    test("register user", async () => {
        const response = await getResponse("POST", "/api/auth/register", null, {
            firstname: "Nora",
            lastname: "Testlund",
            email: "testlund@ridetracker.app",
            password: "testlund123"
        });

        expect(response.success).toBe(true);

        const codeResponse = await getResponse("POST", "/staging/verification", null, {
            id: response.verification
        });
    
        const verifyResponse = await getResponse("POST", "/api/auth/login/verify", null, {
            id: response.verification,
            code: codeResponse.code
        });

        expect(verifyResponse.success).toBe(true);
    });

    let userKey: any = null, userId: any = null;
    
    test("login user", async () => {
        const response = await getResponse("POST", "/api/auth/login", null, {
            email: "testlund@ridetracker.app",
            password: "testlund123"
        });

        expect(response.success).toBe(true);

        const codeResponse = await getResponse("POST", "/staging/verification", null, {
            id: response.verification
        });
    
        const verifyResponse = await getResponse("POST", "/api/auth/login/verify", null, {
            id: response.verification,
            code: codeResponse.code
        });

        expect(verifyResponse.success).toBe(true);

        userKey = verifyResponse.key;
    });
    
    test("renew user", async () => {
        const response = await getResponse("POST", "/api/auth/renew", userKey);

        expect(response.success).toBe(true);

        userKey = response.key;
        userId = response.user.id;
    });

    test("get feed", async () => {
        const response = await getResponse("GET", "/api/feed", userKey);

        expect(response.success).toBe(true);
    });

    test("get activity", async () => {
        const response = await getResponse("GET", "/api/activities/7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675", userKey);

        expect(response.success).toBe(true);

        console.log("activity", response);
    });

    test("get activity comments", async () => {
        const response = await getResponse("GET", "/api/activities/7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675/comments", userKey);

        expect(response.success).toBe(true);

        console.log("activity comments", response);
    });

    let commentId: string | null = null;

    test("create activity comment", async () => {
        const response = await getResponse("POST", "/api/activities/7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675/comments", userKey, {
            message: "Nice test!"
        });

        expect(response.success).toBe(true);

        commentId = response.comment.id;

        console.log("create activity comment", response);
    });

    test("edit activity comment", async () => {
        const response = await getResponse("PATCH", `/api/activities/7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675/comments/${commentId}`, userKey, {
            message: "Nice edited test!"
        });

        expect(response.success).toBe(true);

        console.log("edit activity comment", response);
    });

    test("delete activity comment", async () => {
        const response = await getResponse("DELETE", `/api/activities/7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675/comments/${commentId}`, userKey);

        expect(response.success).toBe(true);

        console.log("delete activity comment", response);
    });

    test("get user bikes", async () => {
        const response = await getResponse("GET", "/api/bikes", userKey);

        expect(response.success).toBe(true);

        console.log("bikes", response);
    });

    test("get profile", async () => {
        const response = await getResponse("GET", `/api/profiles/${userId}`, userKey);

        expect(response.success).toBe(true);

        console.log("profile", response);
    });
});
