export default async function createStoreCoupon(database: D1Database, token: string, product: string, duration: number, expires: number): Promise<void> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await database.prepare("INSERT INTO store_coupons (id, token, product, duration, expires, timestamp) VALUES (?, ?, ?, ?, ?, ?)").bind(id, token, product, duration, expires, timestamp).run();
};
