import { DatabaseSource } from "@ridetracker/authservice";
import { PollAnswer } from "../../../models/PollAnswer";

export async function getPollAnswersByUser(databaseSource: DatabaseSource, pollId: string, userId: string): Promise<PollAnswer[]> {
    return await databaseSource.prepare("SELECT * FROM poll_answers WHERE poll = ? AND user = ?", pollId, userId).all<PollAnswer>();
};
