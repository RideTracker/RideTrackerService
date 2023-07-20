import { getDistance } from "geolib";
import { getActivityById } from "./controllers/activities/getActivityById";
import { getReverseGeocoding } from "./controllers/maps/getReverseGeocoding";
import createRouter from "./domains/router";
import { createActivitySummary } from "./controllers/activities/summary/createActivitySummary";
import { updatePersonalBestActivitySummary } from "./controllers/activities/summary/updatePersonalBestActivitySummary";
import { getActivitySummaryById } from "./controllers/activities/summary/getActivitySummaryById";
import { getActivitiesWithoutSummary } from "./controllers/activities/getActivitiesWithoutSummary";
import getUserAgentGroups from "./controllers/getUserAgentGroups";
import { FeatureFlags, VersionFeatureFlags } from "./models/FeatureFlags";
import { updateActivityAreas } from "./controllers/activities/updateActivityAreas";
import { getActivitySummaryCount } from "./controllers/activities/summary/getActivitySummaryCount";
import { updateActivityStatus } from "./controllers/activities/updateActivityStatus";
import { encode } from "@googlemaps/polyline-codec";
import { updateActivityPolylines } from "./controllers/activities/updateActivityPolylines";
import UserAgent from "./models/UserAgent";
import AnalyticsClient, { createError } from "@ridetracker/analyticsclient";

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

    async fetch(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>) {
        {
            const analyticsClient = new AnalyticsClient(env.ANALYTICS_HOST, {
                identity: env.ANALYTICS_CLIENT_ID,
                key: env.ANALYTICS_CLIENT_TOKEN,
                type: "Basic"
            });

            console.log(JSON.stringify(analyticsClient));
            
            context.waitUntil(env.ANALYTICS_SERVICE.fetch(env.ANALYTICS_HOST + "/api/error", {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${env.ANALYTICS_CLIENT_ID}:${env.ANALYTICS_CLIENT_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "SERVER_ERROR",
                    data: "Test.",
                    service: "RideTrackerService",
                    environment: env.ENVIRONMENT,
                    payload: JSON.stringify({
                        request: {
                            userAgent: request.headers.get("User-Agent"),
                            resource: `${request.method} ${request.url}`,
                            remoteAddress: request.headers.get("CF-Connecting-IP")
                        }
                    })
                })
            }));

        }
        try {
            const userAgent = getUserAgentGroups(request.headers.get("User-Agent"));

            if(!userAgent) {
                return new Response(undefined, {
                    status: 400,
                    statusText: "Bad Request"
                });
            }

            const featureFlags = await env.FEATURE_FLAGS.get<FeatureFlags | null>(`${userAgent.client}`, {
                cacheTtl: 300,
                type: "json"
            });

            const versionFeatureFlags = featureFlags?.versions[userAgent.version.toString()];

            if(!versionFeatureFlags) {
                const analyticsClient = new AnalyticsClient(env.ANALYTICS_HOST, {
                    identity: env.ANALYTICS_CLIENT_ID,
                    key: env.ANALYTICS_CLIENT_TOKEN,
                    type: "Basic"
                });
                
                context.waitUntil(createError(analyticsClient, "INVALID_USER_AGENT_ERROR", "An invalid user agent was detected.", "RideTrackerService", env.ENVIRONMENT, JSON.stringify({
                    request: {
                        userAgent: request.headers.get("User-Agent"),
                        resource: `${request.method} ${request.url}`,
                        remoteAddress: request.headers.get("CF-Connecting-IP")
                    }
                })));

                return new Response(undefined, {
                    status: 400,
                    statusText: "Bad Request"
                });
            }

            if(versionFeatureFlags.status === "UNSUPPORTED") {
                return new Response(undefined, {
                    status: 410,
                    statusText: "Gone"
                });
            }

            request.userAgent = new UserAgent(userAgent);

            const response = await getRequest(request, env, context, versionFeatureFlags);

            if(response.status >= 500 && response.status <= 599) { 
                const analyticsClient = new AnalyticsClient(env.ANALYTICS_HOST, {
                    identity: env.ANALYTICS_CLIENT_ID,
                    key: env.ANALYTICS_CLIENT_TOKEN,
                    type: "Basic"
                });

                context.waitUntil(new Promise<void>(async (resolve) => {
                    await createError(analyticsClient, "SERVER_ERROR", "A response has returned a server error status code.", "RideTrackerService", env.ENVIRONMENT, JSON.stringify({
                        response: {
                            statusCode: response.status,
                            statusText: response.statusText,
                            responseBody: await response.text()
                        },
                        request: {
                            userAgent: request.headers.get("User-Agent"),
                            resource: `${request.method} ${request.url}`,
                            remoteAddress: request.headers.get("CF-Connecting-IP")
                        }
                    }));

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
                if(error.message.startsWith("D1_")) {
                    const analyticsClient = new AnalyticsClient(env.ANALYTICS_HOST, {
                        identity: env.ANALYTICS_CLIENT_ID,
                        key: env.ANALYTICS_CLIENT_TOKEN,
                        type: "Basic"
                    });
                    
                    context.waitUntil(createError(analyticsClient, "D1_ERROR", "An error was thrown by D1 during execution.", "RideTrackerService", env.ENVIRONMENT, JSON.stringify({
                        error,
                        request: {
                            userAgent: request.headers.get("User-Agent"),
                            resource: `${request.method} ${request.url}`,
                            remoteAddress: request.headers.get("CF-Connecting-IP")
                        }
                    })));

                    return new Response(undefined, {
                        status: 502,
                        statusText: "Bad Gateway"
                    });
                }
            }

            const analyticsClient = new AnalyticsClient(env.ANALYTICS_HOST, {
                identity: env.ANALYTICS_CLIENT_ID,
                key: env.ANALYTICS_CLIENT_TOKEN,
                type: "Basic"
            });
            
            context.waitUntil(createError(analyticsClient, "SERVER_ERROR", "An uncaught error was thrown during a response.", "RideTrackerService", env.ENVIRONMENT, JSON.stringify({
                error,
                request: {
                    userAgent: request.headers.get("User-Agent"),
                    resource: `${request.method} ${request.url}`,
                    remoteAddress: request.headers.get("CF-Connecting-IP")
                }
            })));

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
        try {
            const { activityId } = await request.json() as {
                activityId?: string;
            };

            if(!activityId)
                return Response.json({ success: false });

            const activity = await getActivityById(this.env.DATABASE, activityId);

            if(!activity)
                return Response.json({ success: false });

            if((await getActivitySummaryCount(this.env.DATABASE, activity.id)) > 0)
                return Response.json({ success: true, exists: true });

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

            const polylines = [];
        
            for(let session of sessions) {
                const path = [];
        
                for(let location of session.locations) {
                    path.push([ location.coords.latitude, location.coords.longitude ]);
                }
        
                polylines.push(encode(path, 5));
            }

            await Promise.all([
                createActivitySummary(this.env.DATABASE, activity.id, "distance", distance),
                createActivitySummary(this.env.DATABASE, activity.id, "average_speed", averageSpeed),
                createActivitySummary(this.env.DATABASE, activity.id, "elevation", elevation),
                createActivitySummary(this.env.DATABASE, activity.id, "max_speed", maxSpeed),
                updateActivityAreas(this.env.DATABASE, activity.id, startArea, finishArea),
                updateActivityPolylines(this.env.DATABASE, activity.id, JSON.stringify(polylines))
            ]);

            await updatePersonalBestActivitySummary(this.env.DATABASE, activity.user);

            await updateActivityStatus(this.env.DATABASE, activity.id, "processed");

            return Response.json({
                success: true
            });
        }
        catch(error: any) {
            if(error instanceof Error) {
                if(error.message.startsWith("D1_")) {
                    const analyticsClient = new AnalyticsClient(this.env.ANALYTICS_HOST, {
                        identity: this.env.ANALYTICS_CLIENT_ID,
                        key: this.env.ANALYTICS_CLIENT_TOKEN,
                        type: "Basic"
                    });
                    
                    this.state.waitUntil(createError(analyticsClient, "D1_ERROR", "An error was thrown by D1 during a durable object execution.", "RideTrackerService", this.env.ENVIRONMENT, JSON.stringify({
                        error,
                        request: {
                            userAgent: request.headers.get("User-Agent"),
                            resource: `${request.method} ${request.url}`,
                            remoteAddress: request.headers.get("CF-Connecting-IP")
                        }
                    })));

                    return new Response(undefined, {
                        status: 502,
                        statusText: "Bad Gateway"
                    });
                }
            }

            const analyticsClient = new AnalyticsClient(this.env.ANALYTICS_HOST, {
                identity: this.env.ANALYTICS_CLIENT_ID,
                key: this.env.ANALYTICS_CLIENT_TOKEN,
                type: "Basic"
            });
            
            this.state.waitUntil(createError(analyticsClient, "SERVER_ERROR", "An uncaught error was thrown during a durable object execution.", "RideTrackerService", this.env.ENVIRONMENT, JSON.stringify({
                error,
                request: {
                    userAgent: request.headers.get("User-Agent"),
                    resource: `${request.method} ${request.url}`,
                    remoteAddress: request.headers.get("CF-Connecting-IP")
                }
            })));
            
            return new Response(undefined, {
                status: 500,
                statusText: "Internal Server Error"
            });
        }
    };
};
