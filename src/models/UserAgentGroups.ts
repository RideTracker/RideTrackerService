export type UserAgentGroups = {
    client: string;
    version: {
        major: number;
        minor: number;
        patch: number;
        toString: () => string;
    };
};
