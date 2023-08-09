import DatabaseSource from "../../../database/databaseSource";
import { StoreCoupon } from "../../../models/StoreCoupon";

export default async function getStoreCouponByToken(databaseSource: DatabaseSource, token: string): Promise<StoreCoupon | null> {
    return await databaseSource.prepare("SELECT * FROM store_coupons WHERE token = ? AND expires > ?", token, Date.now()).first<StoreCoupon | null>();
};
