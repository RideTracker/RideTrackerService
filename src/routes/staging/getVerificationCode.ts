import { getUserVerification } from "../../controllers/users/verifications/getUserVerification";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export async function handleStagingVerificationRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { id } = request.content;

    const userVerification = await getUserVerification(databaseSource, id);

    if(userVerification === null)
        return Response.json({ success: false, message: "Id doesn't exist." });

    return Response.json({
        code: userVerification.code
    });
};
