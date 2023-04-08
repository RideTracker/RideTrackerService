export const authenticationRenewSchema = {
    content: {
        token: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthenticationRenewRequest(request: any) {
    return Response.json({ status: 200, message: "OK" });
};
