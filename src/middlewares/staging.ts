export async function withStaging(request: any, env: Env, context: any) {
    if(env.ENVIRONMENT !== "staging")
        return new Response(null, { status: 404, statusText: "File Not Found" });
};
