import { getUserByEmail } from "../../controllers/getUserByEmail";

export const authenticationLoginSchema = {
    content: {
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

export async function handleAuthenticationLoginRequest(request: any, env: Env) {
    const { email, password } = request.content;

    const user = await getUserByEmail(env.DATABASE, email);

    if(!user)
        return Response.json({ success: false, message: "This email is not registered to anyone." });

    return Response.json({ success: true, user });
};
