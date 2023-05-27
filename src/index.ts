import { triggerAlarm } from "./controllers/alarms/triggerAlarm";
import createRouter from "./domains/router";
import D1Error from "./models/D1Error";

const router = createRouter();

async function getRequest(request: any, env: any, context: any) {
    const response: Response = await router.handle(request, env);

    if(!response) {
        return new Response(undefined, {
            status: 404,
            statusText: "File Not Found"
        })
    }

    return response;
}

export default {
    async fetch(request: any, env: any, context: any) {
        try {
            const response = await getRequest(request, env, context);

            if(response.status >= 200 && response.status <= 299) { 
                response.headers.set("Access-Control-Allow-Origin", "*");
                response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
                response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            }
            else
                context.waitUntil(new Promise(async (resolve) => {
                    const text = await response.text();

                    if(text.length)
                        await triggerAlarm(env, "Unsuccessful Status Code Alarm", `A response has returned an unsuccessfull status code.\n \n\`\`\`\n${response.status} ${response.statusText}\n\`\`\`\`\`\`\n${text}\n\`\`\`\n${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`);
                    else
                        await triggerAlarm(env, "Unsuccessful Status Code Alarm", `A response has returned an unsuccessfull status code.\n \n\`\`\`\n${response.status} ${response.statusText}\n\`\`\`\n${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`);
                }));
            
            return response;
        }
        catch(error: any) {
            if((error as Error).message.startsWith("D1_")) {
                const d1Error: D1Error = error;

                context.waitUntil(triggerAlarm(env, "D1 Error Alarm", `An error was thrown by D1 during execution.\n \n\`\`\`\n${d1Error.message}\n\`\`\`\`\`\`\n${d1Error.cause.message}\n\`\`\`\n${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`));
            
                return new Response(undefined, {
                    status: 502,
                    statusText: "Bad Gateway"
                });
            }

            context.waitUntil(triggerAlarm(env, "Uncaught Error Alarm", `An uncaught error was thrown during a response.\n \n\`\`\`\n${error}\n\`\`\`\n${request.method} ${request.url}\nRemote Address: || ${request.headers.get("CF-Connecting-IP")} ||`));
            
            return new Response(undefined, {
                status: 500,
                statusText: "Internal Server Error"
            });
        }
    }
};
