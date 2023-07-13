import createStoreCoupon from "../../../controllers/store/coupons/createStoreCoupon";

export const storeCouponDevRequestSchema = {
    content: {
        product: {
            type: "string",
            required: true
        }
    }  
};

export async function handleStoreCouponDevRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>) {
    const { product } = request.content;

    const date = new Date();
    date.setDate(date.getDate() + 1);

    const token = crypto.randomUUID();

    await createStoreCoupon(env.DATABASE, token, product, date.getTime() - Date.now(), date.getTime());

    return Response.json({
        success: true,

        coupon: {
            token
        }
    });
};
