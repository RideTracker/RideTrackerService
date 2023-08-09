import { DatabaseSource } from "@ridetracker/authservice";
import { PollInput } from "../../../models/PollInput";

export async function getPollInputs(databaseSource: DatabaseSource, pollId: string): Promise<PollInput[]> {
    return await databaseSource.prepare("SELECT * FROM poll_inputs WHERE poll = ? ORDER BY 'index' ASC", pollId).all<PollInput>();
};
