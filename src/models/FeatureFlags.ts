export type VersionFeatureFlags = {
    uses: string;
    
    status: "SUPPORTED" | "UNSUPPORTED" | "DEPRECATED";
    
    supersededBy?: string;
};

export type FeatureFlags = {
    versions: {
        [key: string]: VersionFeatureFlags;
    };
};
