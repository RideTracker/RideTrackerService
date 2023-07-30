import { Device } from "../../models/Device";

export async function getDevicesByUser(database: D1Database, userId: string): Promise<Device[]> {
    return (await database.prepare("SELECT * FROM devices WHERE id = ? ORDER BY timestamp DESC").bind(userId).all<Device>()).results ?? [];
};
