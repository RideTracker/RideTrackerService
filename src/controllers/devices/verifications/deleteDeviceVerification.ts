export async function deleteDeviceVerification(database: D1Database, id: string): Promise<void> {
    await database.prepare("DELETE FROM FROM device_verifications WHERE id = ?").bind(id).run();
};
