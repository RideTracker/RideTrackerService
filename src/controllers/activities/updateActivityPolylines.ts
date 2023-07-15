export async function updateActivityPolylines(database: D1Database, id: string, polylines: string): Promise<void> {
    await database.prepare("UPDATE activities SET polylines = ? WHERE id = ?").bind(polylines, id).run();
};
