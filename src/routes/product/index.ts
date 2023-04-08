export async function handleProductRequest(request: any, env: any) {
    console.log(env);
    
    const { results } = await env.DATABASE.prepare("SELECT * FROM users").all();
        
    return Response.json(results);
};
