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
import getDatabaseSource from "./controllers/database/getDatabaseSource";
import { FeatureFlagsExecution } from "./models/FeatureFlagsExecution";
import { DatabaseSource } from "@ridetracker/authservice";

const router = createRouter();

async function getRequest(request: Request, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const response: Response = await router.handle(request, env, context, databaseSource, featureFlags);

    if(!response) {
        return new Response(undefined, {
            status: 404,
            statusText: "File Not Found"
        })
    }

    return response;
}

export default {
    async fetch(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>) {
        let executionFeatureFlags: FeatureFlagsExecution | null = null;

        try {
            if(request.method === "OPTIONS")
                return new Response(undefined, { status: 200, statusText: "OK" });

            const userAgent = getUserAgentGroups(request.headers.get("X-User-Agent") ?? request.headers.get("User-Agent"));

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
                context.waitUntil(env.ANALYTICS_SERVICE.fetch(env.ANALYTICS_SERVICE_HOST + "/api/error", {
                    method: "POST",
                    headers: {
                        "Authorization": `Basic ${env.ANALYTICS_SERVICE_CLIENT_ID}:${env.ANALYTICS_SERVICE_CLIENT_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        error: "INVALID_USER_AGENT_ERROR",
                        data: "An invalid user agent was detected.",
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

            executionFeatureFlags = {
                databaseSource: featureFlags.databaseSource,
                version: versionFeatureFlags
            };

            request.userAgent = new UserAgent(userAgent);

            const databaseSource = getDatabaseSource(env, featureFlags);

            const response = await getRequest(request, env, context, databaseSource, executionFeatureFlags);

            if(response.status >= 500 && response.status <= 599) { 
                context.waitUntil(env.ANALYTICS_SERVICE.fetch(env.ANALYTICS_SERVICE_HOST + "/api/error", {
                    method: "POST",
                    headers: {
                        "Authorization": `Basic ${env.ANALYTICS_SERVICE_CLIENT_ID}:${env.ANALYTICS_SERVICE_CLIENT_TOKEN}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        error: "SERVER_ERROR",
                        data: "A response has returned a server error status code.",
                        service: "RideTrackerService",
                        environment: env.ENVIRONMENT,
                        payload: JSON.stringify({
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
                        })
                    })
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
                    context.waitUntil(env.ANALYTICS_SERVICE.fetch(env.ANALYTICS_SERVICE_HOST + "/api/error", {
                        method: "POST",
                        headers: {
                            "Authorization": `Basic ${env.ANALYTICS_SERVICE_CLIENT_ID}:${env.ANALYTICS_SERVICE_CLIENT_TOKEN}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            error: "D1_ERROR",
                            data: "An error was thrown by D1 during execution.",
                            service: "RideTrackerService",
                            environment: env.ENVIRONMENT,
                            payload: JSON.stringify({
                                error,
                                request: {
                                    userAgent: request.headers.get("User-Agent"),
                                    resource: `${request.method} ${request.url}`,
                                    remoteAddress: request.headers.get("CF-Connecting-IP")
                                }
                            })
                        })
                    }));

                    return new Response(undefined, {
                        status: 502,
                        statusText: "Bad Gateway"
                    });
                }
            }

            context.waitUntil(env.ANALYTICS_SERVICE.fetch(env.ANALYTICS_SERVICE_HOST + "/api/error", {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${env.ANALYTICS_SERVICE_CLIENT_ID}:${env.ANALYTICS_SERVICE_CLIENT_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "SERVER_ERROR",
                    data: "An uncaught error was thrown during a response.",
                    service: "RideTrackerService",
                    environment: env.ENVIRONMENT,
                    payload: JSON.stringify({
                        error,
                        request: {
                            userAgent: request.headers.get("User-Agent"),
                            resource: `${request.method} ${request.url}`,
                            remoteAddress: request.headers.get("CF-Connecting-IP")
                        },
                        featureFlags: executionFeatureFlags
                    })
                })
            }));

            return new Response(undefined, {
                status: 500,
                statusText: "Internal Server Error"
            });
        }
    }
};
