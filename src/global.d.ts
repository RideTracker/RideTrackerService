import UserAgent from "./models/UserAgent";
import { Token } from "./models/token";

declare global {
    interface Env {
        [key: string]: string | undefined;
        
        DATABASE: D1Database;
        BUCKET: R2Bucket;
        ACTIVITY_DURABLE_OBJECT: DurableObjectNamespace;
        FEATURE_FLAGS: KVNamespace;
        
        ENVIRONMENT: "production" | "staging" | "dev";
        CLOUDFLARE_ACCOUNT_ID: string;
        CLOUDFLARE_API_IMAGES_TOKEN: string;

        DISCORD_WEBHOOKS_CLIENT_ID: string;
        DISCORD_WEBHOOKS_CLIENT_TOKEN: string;

        GOOGLE_MAPS_API_TOKEN: string;

        GOOGLE_AUTH_CREDENTIALS: string;

        GITHUB_SHA: string | undefined;
    };

    interface RequestWithKey extends Request {
        [key: string]: any;
    
        userAgent: UserAgent;
        
        key: Required<Token>;
    };
};
