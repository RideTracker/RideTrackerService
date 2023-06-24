import { getUserVerification } from "../../../../../controllers/users/verifications/getUserVerification";

export const authLoginVerificationCodeSchema = {
    params: {
        verificationId: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthLoginVerificationCodeRequest(request: RequestWithKey, env: Env) {
    const { verificationId } = request.params;

    const userVerification = await getUserVerification(env.DATABASE, verificationId);

    if(userVerification === null)
        return Response.json({ success: false });

    return Response.json({ success: true, code: userVerification.code });
};
