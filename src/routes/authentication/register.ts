export const authenticationRegisterSchema = {
    content: {
        firstname: {
            type: "string",
            required: true
        },
        
        lastname: {
            type: "string",
            required: true
        },
        
        email: {
            type: "string",
            required: true
        },
        
        password: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthenticationRegisterRequest(request: any) {
    return Response.json({ status: 200, message: "OK" });
};
