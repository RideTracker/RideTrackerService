import { DatabaseSource } from "@ridetracker/authservice";

export default async function createStoreCoupon(databaseSource: DatabaseSource, token: string, product: string, duration: number, expires: number): Promise<void> {
    const id = crypto.randomUUID();
    const timestamp = Date.now();

    await databaseSource.prepare("INSERT INTO store_coupons (id, token, product, duration, expires, timestamp) VALUES (?, ?, ?, ?, ?, ?)", id, token, product, duration, expires, timestamp).run();
};
