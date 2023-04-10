declare type Env = {
    [key: string]: string | undefined;
    
    DATABASE: D1Database;
};

declare const ENVIRONMENT: "staging" | "production";
