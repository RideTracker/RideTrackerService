import { describe, test } from "vitest";
import { createUser } from "./controllers/users/createUser";
import { createActivity } from "./controllers/activities/createActivity";

describe("populate mock data", async () => {
    test("create users and populate content", async () => {
        for(let index = 0; index < 1; index++) {
            const result = await createUser() as any;

            for(let activityIndex = 0; activityIndex < 3; activityIndex++) {
                const activityResult = await createActivity(result.key);
                
                console.log(index, activityIndex, activityResult);
            }
    
            console.log(index, result);
        }
    }, { timeout: 0 });
});
