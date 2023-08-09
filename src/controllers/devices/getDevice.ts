import { DatabaseSource } from "@ridetracker/authservice";
import { Device } from "../../models/Device";

export async function getDevice(databaseSource: DatabaseSource, id: string): Promise<Device | null> {
    return await databaseSource.prepare("SELECT * FROM devices WHERE id = ? LIMIT 1", id).first<Device>();
};
