export async function withStaging(request: Request, env: Env, context: any) {
    if(env.ENVIRONMENT === "production")
        return new Response(null, { status: 404, statusText: "File Not Found" });
};
