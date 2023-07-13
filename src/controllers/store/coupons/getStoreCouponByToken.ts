import { StoreCoupon } from "../../../models/StoreCoupon";

export default async function getStoreCouponByToken(database: D1Database, token: string): Promise<StoreCoupon | null> {
    return await database.prepare("SELECT * FROM store_coupons WHERE token = ? AND expires > ?").bind(token, Date.now()).first<StoreCoupon | null>();
};
