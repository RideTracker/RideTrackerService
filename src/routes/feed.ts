import { getActivities } from "../controllers/activities/getActivities";
import { getActivitiesByFeed } from "../controllers/activities/getActivitiesByFeed";
import { getPollsByFeed } from "../controllers/polls/getPollsByFeed";
import { Poll } from "../models/Poll";

export const feedRequestSchema = {
    query: {
        search: {
            type: "string",
            required: false
        },
        
        order: {
            type: "string",
            required: false
        },

        includePolls: {
            type: "boolean",
            required: false
        },
        
        timeline: {
            type: "string",
            required: false
        }
    },

    content: {
        offsets: {
            type: "object",
            required: true,

            schema: {
                activities: {
                    type: "number",
                    required: true
                },
                
                polls: {
                    type: "number",
                    required: true
                }
            }
        }
    }
};

export async function handleFeedRequest(request: RequestWithKey, env: Env) {
    const { search, order, timeline, includePolls } = request.query;
    const { offsets } = request.content;

    const activities = await getActivitiesByFeed(env.DATABASE, offsets.activities, 7, search, order, timeline);

    if(!activities)
        return new Response(undefined, { status: 404, statusText: "Not Found" });

    let polls: Poll[] = [];

    if(includePolls)
        polls = await getPollsByFeed(env.DATABASE, offsets.polls, 1);

    return Response.json({
        success: true,

        activities: activities.map((activity) => {
            return {
                id: activity.id,
                timestamp: activity.timestamp
            }
        }),

        polls: polls.map((poll) => {
            return {
                id: poll.id,
                timestamp: poll.timestamp
            };
        }),

        offsets: {
            activities: (offsets.activities) + Math.min(5, activities.length),
            polls: (offsets.polls) + Math.min(1, polls.length)
        },

        limits: {
            activities: 7,
            polls: 1
        }
    });
};
