import { describe, test } from "vitest";
import { createUser } from "./controllers/users/createUser";
import { createActivity } from "./controllers/activities/createActivity";

describe("populate mock data", async () => {
    test("create users and populate content", async () => {
        const users = [];
        for(let index = 0; index < 5; index++) {
            const result = await createUser() as any;

            users.push(result);
        }

        for(let index = 0; index < 15; index++) {
            const activityResult = await createActivity(users[Math.floor(Math.random() * users.length)].key);
            
            console.log(index, activityResult);
        }
    }, { timeout: 0 });
});
