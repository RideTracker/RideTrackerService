import DatabaseSource from "../../database/databaseSource";

export async function setUserAvatar(databaseSource: DatabaseSource, id: string, avatar: string): Promise<void> {
    await databaseSource.prepare("UPDATE users SET avatar = ? WHERE id = ?", avatar, id).run();
};
