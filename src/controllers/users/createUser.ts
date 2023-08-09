import { DatabaseSource } from "@ridetracker/authservice";
import { UserStatus } from "../../models/UserStatus";
import { User } from "../../models/user";
import { getUserById } from "./getUserById";

export async function createUser(databaseSource: DatabaseSource, firstname: string, lastname: string, email: string, password: string): Promise<User | null> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO users (id, firstname, lastname, email, password, avatar, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *", id, firstname, lastname, email, password, "f75ffb2d-ecfe-4cf3-dee1-a36f00314a00", "CREATED" as UserStatus, timestamp).first<User>();
};
