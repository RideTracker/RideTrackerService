import { getPollAnswersByUser } from "../../controllers/polls/answers/getPollAnswersByUser";
import { getPoll } from "../../controllers/polls/getPoll";
import { getPollInputs } from "../../controllers/polls/inputs/getPollInputs";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const pollRequestSchema = {
    params: {
        pollId: {
            type: "string",
            required: true
        }
    }
};

export async function handlePollRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { pollId } = request.params;

    const poll = await getPoll(databaseSource, pollId);

    if(!poll)
        return Response.json({ success: false });

    const inputs = await getPollInputs(databaseSource, poll.id);

    if(!inputs.length)
        return Response.json({ success: false });

    const answers = await getPollAnswersByUser(databaseSource, poll.id, request.key.user);

    return Response.json({
        success: true,

        poll: {
            id: poll.id,
            title: poll.title,
            description: poll.description,
            timestamp: poll.timestamp,

            inputs: inputs.map((input) => {
                return {
                    id: input.id,
                    title: input.title,
                    type: input.type,
                    choices: input.choices,
                    index: input.index
                };
            }),

            answers: answers.map((answer) => {
                return {
                    id: answer.id,
                    input: answer.input,
                    answer: answer.answer,
                    timestamp: answer.timestamp
                };
            })
        }
    });
};
