import { DatabaseSource } from "@ridetracker/authservice";

export async function hasPollInputAnswerByUser(databaseSource: DatabaseSource, pollId: string, inputId: string, userId: string): Promise<boolean> {
    return await databaseSource.prepare("SELECT COUNT(id) AS count FROM poll_answers WHERE poll = ? AND input = ? AND user = ?", pollId, inputId, userId).first<number>("count") !== 0;
};
