import { describe, expect, test } from "vitest";
import Client from "@ridetracker/ridetrackerclient";
import ping from "@ridetracker/ridetrackerclient/dist/controllers/ping";

describe("client", () => {
    test("ping", async () => {
        const client = new Client("https://service.ridetracker.app");

        const pingResponse = await ping(client);

        console.log(pingResponse);

        expect(pingResponse.ping).toBe("pong");
    });
});
