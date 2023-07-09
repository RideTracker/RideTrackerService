import { createMessage } from "../../controllers/messages/createMessage";
import { sendMessageEmail } from "../../controllers/messages/sendMessageEmail";
import { deleteTokensByUser } from "../../controllers/tokens/deleteTokensByUser";
import { getUserById } from "../../controllers/users/getUserById";
import { setUserStatus } from "../../controllers/users/setUserStatus";

export async function handleUserDeletionRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>) {
    await setUserStatus(env.DATABASE, request.key.user, "DELETING");
   
    const message = "I am requesting to delete my account.\nThis message is sent automatically.";

    await createMessage(env.DATABASE, request.key.user, message);

    const user = await getUserById(env.DATABASE, request.key.user);

    context.waitUntil(sendMessageEmail(user, message));

    await deleteTokensByUser(env.DATABASE, request.key.user);
        
    return Response.json({
        success: true
    });
};
