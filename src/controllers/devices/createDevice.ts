import DatabaseSource from "../../database/databaseSource";
import { Device } from "../../models/Device";

export async function createDevice(databaseSource: DatabaseSource, userId: string, name: string): Promise<Device> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO devices (id, user, name, timestamp) VALUES (?, ?, ?, ?) RETURNING *", id, userId, name, timestamp).first<Device>();
};
