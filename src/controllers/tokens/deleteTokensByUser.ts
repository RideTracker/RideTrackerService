import DatabaseSource from "../../database/databaseSource";

export async function deleteTokensByUser(databaseSource: DatabaseSource, user: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM tokens WHERE user = ?", user).run();
};
