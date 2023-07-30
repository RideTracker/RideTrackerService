import { Device } from "../../models/Device";

export async function createDevice(database: D1Database, userId: string, name: string): Promise<Device> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await database.prepare("INSERT INTO devices (id, user, name, timestamp) VALUES (?, ?, ?, ?) RETURNING *").bind(id, userId, name, timestamp).first<Device>();
};
