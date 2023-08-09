import { createMessage } from "../../controllers/messages/createMessage";
import { sendMessageEmail } from "../../controllers/messages/sendMessageEmail";
import { deleteTokensByUser } from "../../controllers/tokens/deleteTokensByUser";
import { getUserById } from "../../controllers/users/getUserById";
import { setUserStatus } from "../../controllers/users/setUserStatus";
import DatabaseSource from "../../database/databaseSource";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export async function handleUserDeletionRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    await setUserStatus(databaseSource, request.key.user, "DELETING");
   
    const message = "I am requesting to delete my account.\nThis message is sent automatically.";

    await createMessage(databaseSource, request.key.user, message);

    const user = await getUserById(databaseSource, request.key.user);

    context.waitUntil(sendMessageEmail(user, message));

    await deleteTokensByUser(databaseSource, request.key.user);
        
    return Response.json({
        success: true
    });
};
