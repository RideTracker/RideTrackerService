import DatabaseSource from "../../database/databaseSource";

export async function updateActivityPolylines(databaseSource: DatabaseSource, id: string, polylines: string): Promise<void> {
    await databaseSource.prepare("UPDATE activities SET polylines = ? WHERE id = ?", polylines, id).run();
};
