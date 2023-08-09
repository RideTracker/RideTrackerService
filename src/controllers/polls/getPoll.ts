import { DatabaseSource } from "@ridetracker/authservice";
import { Poll } from "../../models/Poll";

export async function getPoll(databaseSource: DatabaseSource, id: string): Promise<Poll | null> {
    return await databaseSource.prepare("SELECT * FROM polls WHERE id = ?", id).first<Poll | null>();
};
