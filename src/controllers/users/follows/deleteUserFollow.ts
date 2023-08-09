import DatabaseSource from "../../../database/databaseSource";

export async function deleteUserFollow(databaseSource: DatabaseSource, id: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM user_follows WHERE id = ?", id).run();
};
