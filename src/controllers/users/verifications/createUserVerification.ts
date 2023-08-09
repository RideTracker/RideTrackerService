import DatabaseSource from "../../../database/databaseSource";
import { User } from "../../../models/user";
import { UserVerification } from "../../../models/userVerification";
import { getUserVerification } from "./getUserVerification";

export async function generateUserVerificationCode(): Promise<string> {
    const randomArray = new Uint32Array(1);

    await crypto.getRandomValues(randomArray);

    return String(randomArray[0] % 1000000).padStart(6, '0');
};

export async function createUserVerification(databaseSource: DatabaseSource, user: User): Promise<UserVerification> {
    const id = crypto.randomUUID();
    const code = await generateUserVerificationCode();
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO user_verifications (id, user, code, timestamp) VALUES (?, ?, ?, ?) RETURNING *", id, user.id, code, timestamp).first<UserVerification>();
};
