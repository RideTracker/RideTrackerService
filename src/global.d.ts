declare type Env = {
    [key: string]: string | undefined;
    
    DATABASE: D1Database;
    
    ENVIRONMENT: "production" | "staging";

    GITHUB_SHA: string | undefined;
};
