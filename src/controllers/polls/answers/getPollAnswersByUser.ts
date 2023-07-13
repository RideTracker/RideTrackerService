import { PollAnswer } from "../../../models/PollAnswer";

export async function getPollAnswersByUser(database: D1Database, pollId: string, userId: string): Promise<PollAnswer[]> {
    return (await database.prepare("SELECT * FROM poll_answers WHERE poll = ? AND user = ?").bind(pollId, userId).all<PollAnswer>())?.results ?? [];
};
