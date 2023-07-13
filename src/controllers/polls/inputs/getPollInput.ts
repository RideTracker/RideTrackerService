import { PollInput } from "../../../models/PollInput";

export async function getPollInput(database: D1Database, pollId: string, inputId: string): Promise<PollInput | null> {
    return await database.prepare("SELECT * FROM poll_inputs WHERE poll = ? AND id = ?").bind(pollId, inputId).first<PollInput | null>();
};
