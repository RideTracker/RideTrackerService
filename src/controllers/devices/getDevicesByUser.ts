import { DatabaseSource } from "@ridetracker/authservice";
import { Device } from "../../models/Device";

export async function getDevicesByUser(databaseSource: DatabaseSource, userId: string): Promise<Device[]> {
    return await databaseSource.prepare("SELECT * FROM devices WHERE user = ? ORDER BY timestamp DESC", userId).all<Device>();
};
