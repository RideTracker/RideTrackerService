import Client, { sendWebhook } from "@ridetracker/discordwebhooksclient";

export async function triggerAlarm(env: Env, name: string, description: string): Promise<void> {
    const client = new Client(env.DISCORD_WEBHOOKS_CLIENT_ID, env.DISCORD_WEBHOOKS_CLIENT_TOKEN);

    await sendWebhook(client, "", {
        title: name,
        type: "rich",
        description: description,
        timestamp: new Date().toISOString(),
        color: 15105570,
        thumbnail: {
            url: "https://i.imgur.com/LNtU8Q3.png"
        },
        footer: {
            text: `Triggered automatically by RideTracker Service • ${(env.ENVIRONMENT[0].toUpperCase() + env.ENVIRONMENT.substring(1))} Environment`
        }
    });
};
