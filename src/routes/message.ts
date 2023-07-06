import { createMessage } from "../controllers/messages/createMessage";
import { sendMessageEmail } from "../controllers/messages/sendMessageEmail";
import { getUserById } from "../controllers/users/getUserById";
import { VersionFeatureFlags } from "../models/FeatureFlags";

export const createMessageRequestSchema = {
    content: {
        message: {
            type: "string",
            required: true
        }
    }  
};

export async function handleCreateMessageRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, featureFlags: VersionFeatureFlags) {
    const { message } = request.content;

    if(!message?.length)
        return Response.json({ success: false, message: "You must enter a message." });

    await createMessage(env.DATABASE, request.key.user, message);

    const user = await getUserById(env.DATABASE, request.key.user);

    context.waitUntil(sendMessageEmail(user, message));

    return Response.json({
        success: true
    });
};
