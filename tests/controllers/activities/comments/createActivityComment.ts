import { expect } from "vitest";
import { getResponse } from "../../../utils/response";

import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

export async function createActivityComment(key: string, activityId: string, parent: string | null = null) {
    const result = await getResponse("POST", `/api/activities/${activityId}/comments`, key, {
        parent,
        message: lorem.generateSentences(1 + Math.floor(Math.random() * 4))
    });

    console.log("result", result);

    expect(result.success).toBe(true);

    return result;
};
