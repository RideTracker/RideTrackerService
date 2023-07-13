export default async function deleteStoreCoupon(database: D1Database, id: string): Promise<void> {
    await database.prepare("DELETE FROM store_coupons WHERE id = ?").bind(id).run();
};
