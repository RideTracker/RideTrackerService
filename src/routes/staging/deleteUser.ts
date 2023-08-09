import { deleteUser } from "../../controllers/users/deleteUser";
import { getUserByEmail } from "../../controllers/users/getUserByEmail";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export async function handleStagingDeleteUserRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { email } = request.content;

    const user = await getUserByEmail(databaseSource, email);

    if(user === null)
        return Response.json({ success: true });

    await deleteUser(databaseSource, user);

    return Response.json({ success: true });
};
