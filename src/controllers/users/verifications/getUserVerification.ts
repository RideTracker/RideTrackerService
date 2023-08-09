import { DatabaseSource } from "@ridetracker/authservice";
import { UserVerification } from "../../../models/userVerification";

export async function getUserVerification(databaseSource: DatabaseSource, id: string): Promise<UserVerification> {
    return await databaseSource.prepare("SELECT * FROM user_verifications WHERE id = ?", id).first();
};
