import { LoremIpsum } from "lorem-ipsum";

const types = [ "word", "sentence", "paragraph" ];

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

export default function createMockedComment(): string {
    const type = types[Math.floor(Math.random() * types.length)];

    switch(type) {
        case "word":
            return lorem.generateWords(Math.floor(Math.random() * 5) + 1);

        default:
        case "sentence":
            return lorem.generateSentences(1);

        case "paragraph":
            return lorem.generateSentences(Math.floor(Math.random() * 5) + 1);
    }
};
