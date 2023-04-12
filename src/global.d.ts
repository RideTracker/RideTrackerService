declare type Env = {
    [key: string]: string | undefined;
    
    DATABASE: D1Database;
    
    ENVIRONMENT: "production" | "staging";

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
