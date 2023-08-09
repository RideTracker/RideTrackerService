import { DatabaseSource } from "@ridetracker/authservice";

export async function deleteDeviceVerification(databaseSource: DatabaseSource, id: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM FROM device_verifications WHERE id = ?", id).run();
};
