import { getTokenByKey } from "../controllers/tokens/getTokenByKey";

export async function withAuth(request: RequestWithKey, env: Env, context: any) {
    const authorization = request.headers.get("Authorization").split(' ');

    if(authorization[0] !== "Bearer" || authorization.length !== 2)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    const token = await getTokenByKey(env.DATABASE, authorization[1]);

    if(token === null)
        return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    request.key = token;
};
