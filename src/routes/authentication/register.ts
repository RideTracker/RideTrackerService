import { encryptPassword } from "../../utils/encryption";

export const authenticationRegisterSchema = {
    content: {
        password: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthenticationRegisterRequest(request: any) {
    const { password } = request.content;

    return Response.json({ status: 200, message: "OK", password: await encryptPassword(password) });
};
