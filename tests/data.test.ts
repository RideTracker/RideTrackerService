import { describe, test } from "vitest";
import { createUser } from "./controllers/users/createUser";

describe("populate mock data", async () => {
    test("create users and populate content", async () => {
        for(let index = 0; index < 1; index++) {
            const result = await createUser();
    
            console.log(index, result);
        }
    }, { timeout: 0 });
});
