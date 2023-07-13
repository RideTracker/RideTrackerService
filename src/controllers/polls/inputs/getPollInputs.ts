import { PollInput } from "../../../models/PollInput";

export async function getPollInputs(database: D1Database, pollId: string): Promise<PollInput[]> {
    return (await database.prepare("SELECT * FROM poll_inputs WHERE poll = ? ORDER BY 'index' ASC").bind(pollId).all<PollInput>())?.results ?? [];
};
