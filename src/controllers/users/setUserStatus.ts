import { DatabaseSource } from "@ridetracker/authservice";
import { UserStatus } from "../../models/UserStatus";

export async function setUserStatus(databaseSource: DatabaseSource, id: string, status: UserStatus): Promise<void> {
    await databaseSource.prepare("UPDATE users SET status = ? WHERE id = ?", status, id).run();
};
