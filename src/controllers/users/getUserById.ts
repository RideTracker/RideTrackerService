import DatabaseSource from "../../database/databaseSource";
import { User } from "../../models/user";

export async function getUserById(databaseSource: DatabaseSource, id: string): Promise<User> {
    return await databaseSource.prepare("SELECT * FROM users WHERE id = ?", id).first();
};
