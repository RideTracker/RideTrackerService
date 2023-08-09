import DatabaseSource from "../../../database/databaseSource";
import { DeviceVerification } from "../../../models/DeviceVerification";

export async function getDeviceVerification(databaseSource: DatabaseSource, code: string): Promise<DeviceVerification | null> {
    return await databaseSource.prepare("SELECT * FROM device_verifications WHERE code = ? LIMIT 1", code).first<DeviceVerification>();
};
