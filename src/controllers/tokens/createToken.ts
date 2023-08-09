import { Token, TokenType } from "@ridetracker/authservice";
import { DatabaseSource } from "@ridetracker/authservice";

export async function createToken(databaseSource: DatabaseSource, key: string, type: TokenType, user: string): Promise<Token | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO tokens (id, key, type, user, timestamp) VALUES (?, ?, ?, ?, ?) RETURNING *", id, key, type, user, timestamp).first<Token | null>();
};
