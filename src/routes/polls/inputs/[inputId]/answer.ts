import { createPollAnswer } from "../../../../controllers/polls/answers/createPollAnswer";
import { hasPollInputAnswerByUser } from "../../../../controllers/polls/answers/hasPollInputAnswerByUser";
import { getPoll } from "../../../../controllers/polls/getPoll";
import { getPollInput } from "../../../../controllers/polls/inputs/getPollInput";
import DatabaseSource from "../../../../database/databaseSource";
import { FeatureFlagsExecution } from "../../../../models/FeatureFlagsExecution";

export const pollInputAnswerRequestSchema = {
    params: {
        pollId: {
            type: "string",
            required: true
        },
        
        inputId: {
            type: "string",
            required: true
        }
    },

    content: {
        answer: {
            type: "string",
            required: true
        }
    }
};

export async function handlePollInputAnswerRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { pollId, inputId } = request.params;
    const { answer } = request.content;

    const poll = await getPoll(databaseSource, pollId);

    if(!poll)
        return Response.json({ success: false });

    const input = await getPollInput(databaseSource, poll.id, inputId);

    if(!input)
        return Response.json({ success: false });

    if((await hasPollInputAnswerByUser(databaseSource, poll.id, input.id, request.key.user)))
        return Response.json({ success: false });

    await createPollAnswer(databaseSource, poll.id, input.id, request.key.user, answer);

    return Response.json({ success: true });
};
