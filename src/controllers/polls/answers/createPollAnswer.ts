export async function createPollAnswer(database: D1Database, pollId: string, inputId: string, userId: string, answer: string): Promise<void> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO poll_answers (id, poll, input, user, answer, timestamp) VALUES (?, ?, ?, ?, ?, ?)").bind(id, pollId, inputId, userId, answer, timestamp).run();
};
