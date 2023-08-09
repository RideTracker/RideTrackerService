import DatabaseSource from "../../database/databaseSource";
import { User } from "../../models/user";

export async function getUserByEmail(databaseSource: DatabaseSource, email: string): Promise<User> {
    return await databaseSource.prepare("SELECT * FROM users WHERE email = ?", email).first();
};
