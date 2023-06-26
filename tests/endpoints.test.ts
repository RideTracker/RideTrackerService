import { describe, expect, test } from "vitest";
import Client, { ping } from "@ridetracker/ridetrackerclient";

import { name, version } from "./../package.json";

// @ts-ignore
const SERVICE_API = import.meta.env.VITE_SERVICE_API;

// @ts-ignore
if(import.meta.env.VITE_GITHUB_SHA) {
    describe("github", async () => {
        test("verifying github sha", async () => {
            while(true) {
                try {
                    const response = await fetch(`${SERVICE_API}/staging/github`);
                    const result = await response.json();

                    // @ts-ignore
                    if(result.sha === import.meta.env.VITE_GITHUB_SHA)
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

describe("client", () => {
    test("ping", async () => {
        const client = new Client(`${name}-${version}`, SERVICE_API);

        const pingResponse = await ping(client);

        console.log(pingResponse);

        expect(pingResponse.ping).toBe("pong");
    });
});
