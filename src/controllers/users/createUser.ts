import { User } from "../../models/user";
import { getUserById } from "./getUserById";

export async function createUser(database: D1Database, firstname: string, lastname: string, email: string, password: string): Promise<User | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO users (id, firstname, lastname, email, password, timestamp) VALUES (?, ?, ?, ?, ?, ?)").bind(id, firstname, lastname, email, password, timestamp).run();

    return await getUserById(database, id);
};
