import { Token } from "@ridetracker/authservice";
import { DatabaseSource } from "@ridetracker/authservice";

export async function getTokenById(databaseSource: DatabaseSource, id: string): Promise<Token> {
    return await databaseSource.prepare("SELECT * FROM tokens WHERE id = ?", id).first();
};
