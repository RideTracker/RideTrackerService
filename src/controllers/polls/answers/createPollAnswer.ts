import DatabaseSource from "../../../database/databaseSource";

export async function createPollAnswer(databaseSource: DatabaseSource, pollId: string, inputId: string, userId: string, answer: string): Promise<void> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await databaseSource.prepare("INSERT INTO poll_answers (id, poll, input, user, answer, timestamp) VALUES (?, ?, ?, ?, ?, ?)", id, pollId, inputId, userId, answer, timestamp).run();
};
