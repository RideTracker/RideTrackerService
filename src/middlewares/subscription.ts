import { hasUserSubscription } from "../controllers/users/subscriptions/hasUserSubscription";

export async function withSubscription(request: RequestWithKey, env: Env, context: any) {
    if(!request.key)
        return Response.json({ success: false });

    const hasSubscription = await hasUserSubscription(env.DATABASE, request.key.user);

    if(!hasSubscription)
        return Response.json({ success: false });
};
