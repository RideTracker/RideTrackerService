export async function handleProductRequest(request: any, env: any) {
    console.log(env);
    
    const { results } = await env.DATABASE.prepare("SELECT * FROM Customers WHERE CompanyName = ?")
        .bind("Bs Beverages")
        .all();
        
    return Response.json(results);
};
