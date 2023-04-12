import { getUserById } from "../controllers/users/getUserById";
import { getUserKeyByCode } from "../controllers/users/keys/getUserKeyByCode";

export async function withAuth(request: Request, env: Env, context: any) {
    
    const key = request.headers.get("Authorization");

    const userKey = await getUserKeyByCode(env.DATABASE, key);

    if(userKey === null)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    request.key = userKey;
};
