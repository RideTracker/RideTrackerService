import { getDistance } from "geolib";
import { getActivityById } from "./controllers/activities/getActivityById";
import { triggerAlarm } from "./controllers/alarms/triggerAlarm";
import { getReverseGeocoding } from "./controllers/maps/getReverseGeocoding";
import createRouter from "./domains/router";
import { createActivitySummary } from "./controllers/activities/summary/createActivitySummary";
import { updatePersonalBestActivitySummary } from "./controllers/activities/summary/updatePersonalBestActivitySummary";
import { getActivitySummaryById } from "./controllers/activities/summary/getActivitySummaryById";
import { getActivitiesWithoutSummary } from "./controllers/activities/getActivitiesWithoutSummary";
import getUserAgentGroups from "./controllers/getUserAgentGroups";
import { FeatureFlags, VersionFeatureFlags } from "./models/FeatureFlags";

const router = createRouter();

async function getRequest(request: Request, env: Env, context: EventContext<Env, string, null>, featureFlags: VersionFeatureFlags) {
    const response: Response = await router.handle(request, env, context, featureFlags);

    if(!response) {
        return new Response(undefined, {
            status: 404,
            statusText: "File Not Found"
        })
    }

    return response;
}

export default {
    async scheduled(controller: ScheduledController, env: Env, context: EventContext<Env, string, null>) {
        switch(controller.cron) {
            // every hour
            case "0 * * * *": {
                const activities = await getActivitiesWithoutSummary(env.DATABASE);
                
                const durableObjectId = env.ACTIVITY_DURABLE_OBJECT.idFromName("default");
                const durableObject = env.ACTIVITY_DURABLE_OBJECT.get(durableObjectId);

                activities.forEach((activity) => {
                    context.waitUntil(durableObject.fetch("https://service.ridetracker.app/scheduled", {
                        method: "POST",
                        body: JSON.stringify({
                            activityId: activity.id
                        })
                    }));
                });

                break;
            }
        }
    },

    async fetch(request: Request, env: Env, context: EventContext<Env, string, null>) {
        try {
            const userAgent = getUserAgentGroups(request.headers.get("User-Agent"));

            if(!userAgent) {
                return new Response(undefined, {
                    status: 400,
                    statusText: "Bad Request"
                });
            }

            const featureFlags = await env.FEATURE_FLAGS.get<FeatureFlags | null>(`${userAgent.client}`, "json");

            if(!featureFlags) {
                context.waitUntil(triggerAlarm(env, "User Agent Alarm", `An unrecognized user agent was detected.\n \n\`\`\`\n${userAgent}\n\`\`\`\n${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`));
                
                return new Response(undefined, {
                    status: 400,
                    statusText: "Bad Request"
                });
            }

            const versionFeatureFlags = featureFlags.versions[userAgent.version.toString()];

            if(versionFeatureFlags.status === "UNSUPPORTED") {
                return new Response(undefined, {
                    status: 410,
                    statusText: "Gone"
                });
            }

            const response = await getRequest(request, env, context, versionFeatureFlags);

            if(response.status < 200 || response.status > 299) { 
                context.waitUntil(new Promise<void>(async (resolve) => {
                    await triggerAlarm(env, "Unsuccessful Status Code Alarm", `A response has returned an unsuccessfull status code.\n \n\`\`\`\n${response.status} ${response.statusText}\n\`\`\`${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`);

                    resolve();
                }));
            }

            response.headers.set("Access-Control-Allow-Origin", "*");
            response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
            response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            
            return response;
        }
        catch(error: any) {
            if(error instanceof Error) {
                if(error.message.startsWith("D1_") && error.cause instanceof Error) {
                    context.waitUntil(triggerAlarm(env, "D1 Error Alarm", `An error was thrown by D1 during execution.\n \n\`\`\`\n${error.message}\n\`\`\`\`\`\`\n${error.cause.message}\n\`\`\`\n${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`));
                
                    return new Response(undefined, {
                        status: 502,
                        statusText: "Bad Gateway"
                    });
                }
            }

            context.waitUntil(triggerAlarm(env, "Uncaught Error Alarm", `An uncaught error was thrown during a response.\n \n\`\`\`\n${error}\n\`\`\`\n${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`));
            
            return new Response(undefined, {
                status: 500,
                statusText: "Internal Server Error"
            });
        }
    }
};

export class ActivityDurableObject {
    state: DurableObjectState;
    env: Env;

    constructor(state: DurableObjectState, env: Env) {
        this.state = state;
        this.env = env;
    };

    async fetch(request: Request) {
        const { activityId } = await request.json() as {
            activityId?: string;
        };

        if(!activityId)
            return Response.json({ success: false });

        const activity = await getActivityById(this.env.DATABASE, activityId);

        if(!activity)
            return Response.json({ success: false });

        if(await getActivitySummaryById(this.env.DATABASE, activity.id))
            return Response.json({ success: true });

        const bucket = await this.env.BUCKET.get(`activities/${activity.id}.json`);

        if(!bucket)
            return Response.json({ success: false });

        const sessions = await bucket.json<Array<any>>();

        let startArea = null;
        let finishArea = null;
        let distance = 0;
        let elevation = 0;
        let maxSpeed = 0;

        if(sessions.length && sessions[0].locations.length) {
            const getAreaName = async (coords: any) => {
                const geocoding = await getReverseGeocoding(this.env.GOOGLE_MAPS_API_TOKEN, coords.latitude, coords.longitude);
    
                if(geocoding.results.length) {
                    const geocodingResult = geocoding.results[0];
    
                    const geocodingComponent = geocodingResult.address_components.find((component: any) => component.types.includes("postal_town")) ?? geocodingResult.address_components.find((component: any) => component.types.includes("political")) ?? geocodingResult.address_components.find((component: any) => component.types.includes("country"));
                
                    return geocodingComponent?.long_name ?? null;
                }

                return null;
            }

            await Promise.all([
                getAreaName(sessions[0].locations[0].coords).then((name) => startArea = name),
                getAreaName(sessions[sessions.length - 1].locations[sessions[sessions.length - 1].locations.length - 1].coords).then((name) => finishArea = name)
            ]);
        }   

        const speeds = [];

        for(let session of sessions) {
            for(let index = 1; index < session.locations.length; index++) {
                distance += getDistance(session.locations[index - 1].coords, session.locations[index].coords, 1);

                speeds.push(session.locations[index].coords.speed);

                elevation += Math.max(0, session.locations[index].coords.altitude -session.locations[index - 1].coords.altitude);

                if(session.locations[index].coords.speed > maxSpeed)
                    maxSpeed = session.locations[index].coords.speed;
            }
        }

        const speedSum = speeds.reduce((a, b) => a + b, 0);
        const averageSpeed = (speedSum / speeds.length) || 0;

        let distancePersonalBest = null;
        let averageSpeedPersonalBest = null;
        let elevationPersonalBest = null;
        let maxSpeedPersonalBest = null;

        const activitySummary = await createActivitySummary(this.env.DATABASE, activity.id, startArea, finishArea, distance, distancePersonalBest, averageSpeed, averageSpeedPersonalBest, elevation, elevationPersonalBest, maxSpeed, maxSpeedPersonalBest);

        if(!activitySummary)
            return Response.json({ success: false });

        await updatePersonalBestActivitySummary(this.env.DATABASE, activity.user);

        return Response.json({
            success: true
        });
    };
};
