import { getTokenByKey } from "../controllers/tokens/getTokenByKey";

export async function withAuth(request: RequestWithKey, env: Env, context: any) {
    const authorization = request.headers.get("Authorization");
    
    if(!authorization)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    const sections = authorization.split(' ');

    if(sections[0] !== "Bearer" || sections.length !== 2)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    const token = await getTokenByKey(env.DATABASE, sections[1]);

    if(token === null)
        return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    request.key = token;
};
