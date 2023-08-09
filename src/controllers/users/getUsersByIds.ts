import DatabaseSource from "../../database/databaseSource";
import { User } from "../../models/user";

export async function getUsersById(databaseSource: DatabaseSource, ids: string[]): Promise<User[]> {
    return await databaseSource.prepare("SELECT * FROM users WHERE id IN (SELECT value FROM json_each(?1))", JSON.stringify(ids)).all<User>();
};
