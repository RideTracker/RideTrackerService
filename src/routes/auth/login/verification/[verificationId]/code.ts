import { getUserVerification } from "../../../../../controllers/users/verifications/getUserVerification";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../../../../models/FeatureFlagsExecution";

export const authLoginVerificationCodeSchema = {
    params: {
        verificationId: {
            type: "string",
            required: true
        }
    }
};

export async function handleAuthLoginVerificationCodeRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { verificationId } = request.params;

    const userVerification = await getUserVerification(databaseSource, verificationId);

    if(userVerification === null)
        return Response.json({ success: false });

    return Response.json({ success: true, code: userVerification.code });
};
