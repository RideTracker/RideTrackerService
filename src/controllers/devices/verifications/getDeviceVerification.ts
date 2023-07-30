import { DeviceVerification } from "../../../models/DeviceVerification";

export async function getDeviceVerification(database: D1Database, code: string): Promise<DeviceVerification | null> {
    return await database.prepare("SELECT * FROM device_verifications WHERE code = ? LIMIT 1").bind(code).first<DeviceVerification>();
};
