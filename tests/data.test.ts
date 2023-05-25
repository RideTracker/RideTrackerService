import { beforeAll, describe, test } from "vitest";
import fs from "fs";
import { createUser } from "./controllers/users/createUser";
import { createActivity } from "./controllers/activities/createActivity";
import { createActivityComment } from "./controllers/activities/comments/createActivityComment";
import Client, { registerUser } from "@ridetracker/ridetrackerclient";

const persons = JSON.parse(fs.readFileSync("./tests/data/persons.json", "utf-8"));

describe("populate mock data", async () => {
    let tokens: string[] = [];

    test("Create users", async () => {
        const client = new Client(process.env.VITEST_SERVICE_API_URL, process.env.VITEST_SERVICE_API_TOKEN);

        for(let index = 0; index < 5; index++) {
            const firstname = persons.names[Math.floor(Math.random() * persons.names.length)].split(' ')[0];
            const lastname = persons.names[Math.floor(Math.random() * persons.names.length)].split(' ')[1];

            const user = await registerUser(client, firstname, lastname, `${firstname}.${lastname}+mock@ridetracker.app`.toLowerCase(), "test");

            
        }
    });

    test("create users and populate content", async () => {
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
    }, { timeout: 0 });
});
