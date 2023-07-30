import { Device } from "../../models/Device";

export async function getDevice(database: D1Database, id: string): Promise<Device | null> {
    return await database.prepare("SELECT * FROM devices WHERE id = ? LIMIT 1").bind(id).first<Device>();
};
