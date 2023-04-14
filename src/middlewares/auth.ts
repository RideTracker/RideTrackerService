import { getUserById } from "../controllers/users/getUserById";
import { getUserKeyByCode } from "../controllers/users/keys/getUserKeyByCode";

export async function withAuth(request: Request, env: Env, context: any) {
    const authorization = request.headers.get("Authorization").split(' ');

    if(authorization[0] !== "Bearer" || authorization.length !== 2)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    const userKey = await getUserKeyByCode(env.DATABASE, authorization[1]);

    if(userKey === null)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    request.key = userKey;
};
