import UserAgent from "./models/UserAgent";
import { Token } from "@ridetracker/authservice";

declare global {
    interface Env {
        DATABASE: D1Database;
        BUCKET: R2Bucket;
        ACTIVITY_DURABLE_OBJECT: DurableObjectNamespace;
        FEATURE_FLAGS: KVNamespace;
        
        ENVIRONMENT: "production" | "staging" | "dev";
        CLOUDFLARE_ACCOUNT_ID: string;
        CLOUDFLARE_API_IMAGES_TOKEN: string;

        ANALYTICS_SERVICE: Fetcher;
        ANALYTICS_SERVICE_HOST: string;
        ANALYTICS_SERVICE_CLIENT_ID: string;
        ANALYTICS_SERVICE_CLIENT_TOKEN: string;

        GOOGLE_MAPS_API_TOKEN: string;

        GOOGLE_AUTH_CREDENTIALS: string;

        GITHUB_SHA: string | undefined;
    };

    interface RequestWithKey extends Request {
        [key: string]: any;
    
        userAgent: UserAgent;
        
        key: Token;
    };
};
