import * as dotenv from "dotenv";
dotenv.config();

import { describe, test, expect } from "vitest";
import fs from "fs";
import Client, { createActivity, getVerificationCode, registerUser, verifyLogin } from "@ridetracker/ridetrackerclient";
import { createMockedSessions } from "./controllers/createMockedSessions";

const persons = JSON.parse(fs.readFileSync("./tests/data/persons.json", "utf-8"));

describe("populate mock data", async () => {
    let tokens: string[] = [];

    test("Create users", async () => {
        const client = new Client(process.env.VITEST_SERVICE_API_URL, process.env.VITEST_SERVICE_API_TOKEN);

        for(let index = 0; index < 5; index++) {
            const firstname = persons.names[Math.floor(Math.random() * persons.names.length)].split(' ')[0];
            const lastname = persons.names[Math.floor(Math.random() * persons.names.length)].split(' ')[1];

            const userResult = await registerUser(client, firstname, lastname, `${firstname.toLowerCase()}${lastname.toLowerCase()}+mock@ridetracker.app`, "test");
            expect(userResult.success).toBe(true);
            
            const verificationCodeResult = await getVerificationCode(client, userResult.verification);
            expect(verificationCodeResult.success).toBe(true);

            const verificationResult = await verifyLogin(client, userResult.verification, verificationCodeResult.code);
            expect(verificationResult.success).toBe(true);

            tokens.push(verificationResult.key);
        }
    }, 60 * 1000);

    test("Create activities", async () => {
        for(let index = 0; index < 10; index++) {
            const token = tokens[Math.floor(Math.random() * tokens.length)];

            const client = new Client(process.env.VITEST_SERVICE_API_URL, token);

            const sessions = await createMockedSessions();

            expect(sessions).toBeTruthy();

            const activityResult = await createActivity(client, sessions);

            expect(activityResult.success).toBe(true);
        }
    }, 60 * 1000);

    /*test("create users and populate content", async () => {
        const users = [];

        for(let index = 0; index < 5; index++) {
            const result = await createUser() as any;

            users.push(result);
        }

        const activities = [];
        for(let index = 0; index < 15; index++) {
            const activityResult = await createActivity(users[Math.floor(Math.random() * users.length)].key);
            
            if(!activityResult) {
                console.warn("failed", activityResult);

                continue;
            }
            
            console.log(index, activityResult);

            activities.push(activityResult.activity.id);
        }

        for(let index = 0; index < 20; index++) {
            const activity = activities[Math.floor(Math.random() * activities.length)];

            const commentResult = await createActivityComment(users[Math.floor(Math.random() * users.length)].key, activity);
            
            console.log(index, commentResult);

            for(let replyIndex = 0, count = Math.floor(Math.random() * 3); replyIndex < count; replyIndex++) {
                const replyResult = await createActivityComment(users[Math.floor(Math.random() * users.length)].key, activity, commentResult.comment.id);
                
                console.log(index, replyResult);
            }
        }
    }, { timeout: 0 });*/
});
