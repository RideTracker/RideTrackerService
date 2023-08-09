import DatabaseSource from "../../../database/databaseSource";

export default async function deleteStoreCoupon(databaseSource: DatabaseSource, id: string): Promise<void> {
    await databaseSource.prepare("DELETE FROM store_coupons WHERE id = ?", id).run();
};
