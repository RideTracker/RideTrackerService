import { describe, test } from "vitest";
import { createUser } from "./controllers/users/createUser";
import { createActivity } from "./controllers/activities/createActivity";
import { createActivityComment } from "./controllers/activities/comments/createActivityComment";

describe("populate mock data", async () => {
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
