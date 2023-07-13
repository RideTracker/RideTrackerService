export async function hasPollInputAnswerByUser(database: D1Database, pollId: string, inputId: string, userId: string): Promise<boolean> {
    return await database.prepare("SELECT COUNT(id) AS count FROM poll_answers WHERE poll = ? AND input = ? AND user = ?").bind(pollId, inputId, userId).first<number>("count") !== 0;
};
