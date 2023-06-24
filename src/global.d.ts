declare type Env = {
    [key: string]: string | undefined;
    
    DATABASE: D1Database;
    BUCKET: R2Bucket;
    ACTIVITY_DURABLE_OBJECT: DurableObjectNamespace;
    
    ENVIRONMENT: "production" | "staging" | "dev";
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_API_IMAGES_TOKEN: string;

    DISCORD_WEBHOOKS_CLIENT_ID: string;
    DISCORD_WEBHOOKS_CLIENT_TOKEN: string;

    GOOGLE_MAPS_API_TOKEN: string;

    GITHUB_SHA: string | undefined;
};

declare type RequestWithKey = Request & {
    [key: string]: any;
    
    key: {
        id: string;
        key: string;
        user: string;
        timestamp: number;
    };
};
