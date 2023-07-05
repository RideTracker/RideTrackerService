import { getTokenByKey } from "../controllers/tokens/getTokenByKey";

export async function withAuth(request: RequestWithKey, env: Env, context: any) {
    const authorizationHeader = request.headers.get("Authorization");
    
    if(!authorizationHeader)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    const sections = authorizationHeader.split(' ');

    if(sections.length !== 2)
       return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

    const type = sections[0];
    const authorization = sections[1];

    switch(type) {
        case "Basic": {
            const authorizationToken = authorization.split(':');

            if(authorizationToken.length !== 2)
                return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

            const email = authorizationToken[0];
            const key = authorizationToken[1];

            const token = await getTokenByKey(env.DATABASE, key);

            if(token === null)
                return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

            if(!token.user)
                return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });
       
            if(token.email !== email)
                return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });
                
            request.key = {
                id: token.id,
                key: token.key,
                user: token.user,
                timestamp: token.timestamp
            };

            break;
        }

        case "Bearer": {
            const token = await getTokenByKey(env.DATABASE, authorization);

            if(token.user)
                return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });

            request.key = {
                id: token.id,
                key: token.key,
                user: "",
                timestamp: token.timestamp
            };

            break;
        }

        default:
            return Response.json({ success: false }, { status: 401, statusText: "Unauthorized" });
    }
};
