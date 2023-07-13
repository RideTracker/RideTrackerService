import { getPollAnswersByUser } from "../../controllers/polls/answers/getPollAnswersByUser";
import { getPoll } from "../../controllers/polls/getPoll";
import { getPollInputs } from "../../controllers/polls/inputs/getPollInputs";

export const pollRequestSchema = {
    params: {
        pollId: {
            type: "string",
            required: true
        }
    }
};

export async function handlePollRequest(request: RequestWithKey, env: Env) {
    const { pollId } = request.params;

    const poll = await getPoll(env.DATABASE, pollId);

    if(!poll)
        return Response.json({ success: false });

    const inputs = await getPollInputs(env.DATABASE, poll.id);

    if(!inputs.length)
        return Response.json({ success: false });

    const answers = await getPollAnswersByUser(env.DATABASE, poll.id, request.key.user);

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
