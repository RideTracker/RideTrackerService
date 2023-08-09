import DatabaseSource from "../../../database/databaseSource";
import { UserVerification } from "../../../models/userVerification";

export async function deleteUserVerification(databaseSource: DatabaseSource, userVerification: UserVerification): Promise<void> {
    await databaseSource.prepare("DELETE FROM user_verifications WHERE id = ?", userVerification.id).run();
};
