export const authRenewSchema = {
    content: {
        token: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthRenewRequest(request: any) {
    return Response.json({ status: 200, message: "OK" });
};
