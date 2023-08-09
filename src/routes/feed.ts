import { getActivities } from "../controllers/activities/getActivities";
import { getActivitiesByFeed } from "../controllers/activities/getActivitiesByFeed";
import { getPollsByFeed } from "../controllers/polls/getPollsByFeed";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../models/FeatureFlagsExecution";
import { Poll } from "../models/Poll";

export const feedRequestSchema = {
    query: {
        relations: {
            type: "string",
            required: true
        },

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

export async function handleFeedRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { relations, search, order, timeline, includePolls } = request.query;
    const { offsets } = request.content;

    const activities = await getActivitiesByFeed(databaseSource, request.key.user, offsets.activities, 7, relations, search, order, timeline);

    if(!activities)
        return new Response(undefined, { status: 404, statusText: "Not Found" });

    let polls: Poll[] = [];

    if(includePolls)
        polls = await getPollsByFeed(databaseSource, offsets.polls, 1);

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
            activities: offsets.activities + 7,
            polls: offsets.polls + 1
        },

        limits: {
            activities: 7,
            polls: 1
        }
    });
};
