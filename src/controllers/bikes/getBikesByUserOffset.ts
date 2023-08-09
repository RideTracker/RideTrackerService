import DatabaseSource from "../../database/databaseSource";
import { Bike } from "../../models/bike";

export async function getBikesByUserOffset(databaseSource: DatabaseSource, user: string, offset: number): Promise<Bike[]> {
    return await databaseSource.prepare("SELECT * FROM bikes WHERE user = ? ORDER BY timestamp DESC LIMIT 10 OFFSET ?", user, offset).all<Bike>();
};
