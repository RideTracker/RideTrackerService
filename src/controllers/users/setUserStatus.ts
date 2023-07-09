import { UserStatus } from "../../models/UserStatus";

export async function setUserStatus(database: D1Database, id: string, status: UserStatus): Promise<void> {
    await database.prepare("UPDATE users SET status = ? WHERE id = ?").bind(status, id).run();
};
