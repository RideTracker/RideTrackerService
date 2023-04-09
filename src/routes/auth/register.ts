import { encryptPassword } from "../../utils/encryption";

export const authRegisterSchema = {
    content: {
        password: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthRegisterRequest(request: any) {
    const { password } = request.content;

    return Response.json({ status: 200, message: "OK", password: await encryptPassword(password) });
};
