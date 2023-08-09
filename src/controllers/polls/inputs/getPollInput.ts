import DatabaseSource from "../../../database/databaseSource";
import { PollInput } from "../../../models/PollInput";

export async function getPollInput(databaseSource: DatabaseSource, pollId: string, inputId: string): Promise<PollInput | null> {
    return await databaseSource.prepare("SELECT * FROM poll_inputs WHERE poll = ? AND id = ?", pollId, inputId).first<PollInput | null>();
};
