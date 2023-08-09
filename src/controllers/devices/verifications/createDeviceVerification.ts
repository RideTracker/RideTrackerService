import DatabaseSource from "../../../database/databaseSource";
import { DeviceVerification } from "../../../models/DeviceVerification";

export function generateDeviceVerificationCode(): string {
    const randomArray = new Uint32Array(1);

    crypto.getRandomValues(randomArray);

    return String(randomArray[0] % 1000000).padStart(6, '0');
};

export async function createDeviceVerification(databaseSource: DatabaseSource, userId: string): Promise<DeviceVerification> {
    const id = crypto.randomUUID();
    const code = generateDeviceVerificationCode();
    const expires = Date.now() + (30 * 1000);
    const timestamp = Date.now();

    return await databaseSource.prepare("INSERT INTO device_verifications (id, user, code, expires, timestamp) VALUES (?, ?, ?, ?, ?) RETURNING *", id, userId, code, expires, timestamp).first<DeviceVerification>();
};
