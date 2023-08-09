import DatabaseSource from "../../database/databaseSource";
import { Bike } from "../../models/bike";

export async function getBikeById(databaseSource: DatabaseSource, id: string): Promise<Bike> {
    return await databaseSource.prepare("SELECT * FROM bikes WHERE id = ?", id).first();
};
