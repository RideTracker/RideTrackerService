import { describe, test, expect } from "vitest";
import fs from "fs";
import Client, { createActivity, createActivityComment, createBike, getVerificationCode, ping, registerUser, uploadUserAvatar, verifyLogin } from "@ridetracker/ridetrackerclient";
import { createMockedSessions } from "./controllers/createMockedSessions";
import createMockedComment from "./controllers/createMockedComment";

import { name, version } from "./../package.json";
import { ClientToken } from "@ridetracker/ridetrackerclient/dist/models/ClientToken";

const persons = JSON.parse(fs.readFileSync("./tests/data/persons.json", "utf-8"));

describe("Expect active services", () => {
    test("Service API", async () => {
        const client = new Client(`${name}-${version}`, process.env.VITEST_SERVICE_API_URL, {
            type: "Bearer",
            key: process.env.VITEST_SERVICE_API_TOKEN
        });

        const pingResult = await ping(client);
        expect(pingResult.success).toBe(true);
    });
});

describe("Populate mock data", async () => {
    let tokens: ClientToken[] = [];
    let userAvatars: string[] = [];
    let userBikes: {
        [key: string]: string
    } = {};
    let activities: string[] = [];
    let activityComments: string[] = [];

    test("Create users", async () => {
        const client = new Client(`${name}-${version}`, process.env.VITEST_SERVICE_API_URL, {
            type: "Bearer",
            key: process.env.VITEST_SERVICE_API_TOKEN
        });

        for(let index = 0; index < 5; index++) {
            const firstname = persons.names[Math.floor(Math.random() * persons.names.length)].split(' ')[0];
            const lastname = persons.names[Math.floor(Math.random() * persons.names.length)].split(' ')[1];

            const email = `${firstname.toLowerCase()}${lastname.toLowerCase()}+mock@ridetracker.app`;

            const userResult = await registerUser(client, firstname, lastname, email, "test");
            expect(userResult.success).toBe(true);
            
            const verificationCodeResult = await getVerificationCode(client, userResult.verification);
            expect(verificationCodeResult.success).toBe(true);

            const verificationResult = await verifyLogin(client, userResult.verification, verificationCodeResult.code);
            expect(verificationResult.success).toBe(true);

            tokens.push({
                email,
                key: verificationResult.token.key
            });
        }
    }, 60 * 1000);

    test("Create bikes", async () => {
        expect(tokens.length).toBeTruthy();

        for(let token of tokens) {
            const client = new Client(`${name}-${version}`, process.env.VITEST_SERVICE_API_URL, token);

            const types = [ "mountain_bike", "cruiser", "road_bike", "fixed_gear" ];

            const result = await createBike(client, "", types[Math.floor(Math.random() * types.length)], []);

            userBikes[token.key] = result.bike.id;
        
            expect(result.success).toBe(true);
        }
    });

    test("Create activities", async () => {
        expect(tokens.length).toBeTruthy();

        for(let index = 0; index < 10; index++) {
            const token = tokens[Math.floor(Math.random() * tokens.length)];

            const client = new Client(`${name}-${version}`, process.env.VITEST_SERVICE_API_URL, token);

            const sessions = await createMockedSessions();
            expect(sessions).toBeTruthy();

            const activityResult = await createActivity(client, sessions, undefined, undefined, userBikes[token.key]);
            expect(activityResult.success).toBe(true);

            activities.push(activityResult.activity.id);
        }
    }, 60 * 1000);

    test("Create activity comments", async () => {
        expect(activities.length).toBeTruthy();

        for(let activity of activities) {
            for(let index = 0; index < Math.max(1, Math.ceil(Math.random() * 3)); index++) {
                const token = tokens[Math.floor(Math.random() * tokens.length)];

                const client = new Client(`${name}-${version}`, process.env.VITEST_SERVICE_API_URL, token);
                
                const activityCommentResult = await createActivityComment(client, activity, createMockedComment());
                expect(activityCommentResult.success).toBe(true);

                activityComments.push(activityCommentResult.comment.id);
            }
        }
    }, 60 * 1000);

    test("Create activity child comments", async () => {
        expect(activityComments.length).toBeTruthy();

        for(let index = 0; index < 10; index++) {
            const token = tokens[Math.floor(Math.random() * tokens.length)];

            const client = new Client(`${name}-${version}`, process.env.VITEST_SERVICE_API_URL, token);

            const activity = activities[Math.floor(Math.random() * activities.length)];
            const parent = activityComments[Math.floor(Math.random() * activityComments.length)];

            const activityCommentResult = await createActivityComment(client, activity, createMockedComment(), parent);
            expect(activityCommentResult.success).toBe(true);
        }
    }, 60 * 1000);

    test("Create user avatars", async () => {
        expect(tokens.length).toBeTruthy();

        for(let token of tokens) {
            const client = new Client(`${name}-${version}`, process.env.VITEST_SERVICE_API_URL, token);

            const response = await fetch("https://staging.avatar-service.ridetracker.app/api/avatars/render/random", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${client.token?.key}`
                }
            });

            const result = await response.json() as any;
            expect(result.success).toBe(true);

            const userAvatarResult = await uploadUserAvatar(client, result.base64Image);
            expect(userAvatarResult.success).toBe(true);

            userAvatars.push(userAvatarResult.userAvatar.id);
        }
    }, 60 * 1000);
});
