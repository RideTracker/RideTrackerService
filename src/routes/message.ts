import { createMessage } from "../controllers/messages/createMessage";
import { sendMessageEmail } from "../controllers/messages/sendMessageEmail";
import { getUserById } from "../controllers/users/getUserById";
import { DatabaseSource } from "@ridetracker/authservice";
import { VersionFeatureFlags } from "../models/FeatureFlags";
import { FeatureFlagsExecution } from "../models/FeatureFlagsExecution";

export const createMessageRequestSchema = {
    content: {
        message: {
            type: "string",
            required: true
        }
    }  
};

export async function handleCreateMessageRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { message } = request.content;

    if(!message?.length)
        return Response.json({ success: false, message: "You must enter a message." });

    await createMessage(databaseSource, request.key.user, message);

    const user = await getUserById(databaseSource, request.key.user);

    context.waitUntil(sendMessageEmail(user, message));

    return Response.json({
        success: true
    });
};
