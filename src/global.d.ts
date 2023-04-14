declare type Env = {
    [key: string]: string | undefined;
    
    DATABASE: D1Database;
    
    ENVIRONMENT: "production" | "staging";
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_API_IMAGES_TOKEN: string;

    GITHUB_SHA: string | undefined;
};

declare type Request = {
    [key: string]: any | undefined;
    
    key: {
        id: string;
        user: string;
        timestamp: number;
    };
};
