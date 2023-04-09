import { User } from "../../../models/user";
import { UserVerification } from "../../../models/userVerification";

export async function deleteUserVerification(database: D1Database, userVerification: UserVerification): Promise<void> {
    await database.prepare("DELETE FROM user_verifications WHERE id = ?").bind(userVerification.id).run();
};
