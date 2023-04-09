import { User } from "../models/user";
import { UserVerification } from "../models/userVerification";

export async function generateUserVerificationCode(): Promise<string> {
    const randomArray = new Uint32Array(1);

    await crypto.getRandomValues(randomArray);

    return String(randomArray[0] % 1000000).padStart(6, '0');
};

export async function createUserVerification(database: D1Database, user: User): Promise<UserVerification> {
    const id = crypto.randomUUID();
    const code = await generateUserVerificationCode();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO user_verifications (id, user, code, timestamp) VALUES (?, ?, ?, ?)").bind(id, user.id, code, timestamp).run();
    
    return {
        id,
        user,
        code,
        timestamp
    };
};
