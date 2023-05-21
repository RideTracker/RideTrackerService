declare type Env = {
    [key: string]: string | undefined;
    
    DATABASE: D1Database;
    BUCKET: R2Bucket;
    
    ENVIRONMENT: "production" | "staging";
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_API_IMAGES_TOKEN: string;

    GOOGLE_MAPS_API_TOKEN: string;

    GITHUB_SHA: string | undefined;
};

declare type Request = {
    [key: string]: any | undefined;
    
    key: {
        id: string;
        key: string;
        user: string;
        timestamp: number;
    };
};
