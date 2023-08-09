import DatabaseSource from "../../database/databaseSource";

export async function deleteToken(databaseSource: DatabaseSource, id: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM tokens WHERE id = ?", id).run();
};
