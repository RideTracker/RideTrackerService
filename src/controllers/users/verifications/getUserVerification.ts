import { UserVerification } from "../../../models/userVerification";

export async function getUserVerification(database: D1Database, id: string): Promise<UserVerification | null> {
    return await database.prepare("SELECT * FROM user_verifications WHERE id = ?").bind(id).first();
};
