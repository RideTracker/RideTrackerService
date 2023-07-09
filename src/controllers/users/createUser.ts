import { UserStatus } from "../../models/UserStatus";
import { User } from "../../models/user";
import { getUserById } from "./getUserById";

export async function createUser(database: D1Database, firstname: string, lastname: string, email: string, password: string): Promise<User> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO users (id, firstname, lastname, email, password, avatar, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(id, firstname, lastname, email, password, "f75ffb2d-ecfe-4cf3-dee1-a36f00314a00", "CREATED" as UserStatus, timestamp).run();

    return await getUserById(database, id);
};
