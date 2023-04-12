import { getUserVerification } from "../../controllers/users/verifications/getUserVerification";

export async function handleStagingVerificationRequest(request: Request, env: Env) {
    const { id } = request.content;

    const userVerification = await getUserVerification(env.DATABASE, id);

    if(userVerification === null)
        return Response.json({ success: false, message: "Id doesn't exist." });

    return Response.json({
        code: userVerification.code
    });
};
