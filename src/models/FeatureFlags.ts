export type VersionDeviceFeatureFlags = {
    supersededBy?: string;
};

export type VersionFeatureFlags = {
    status: "SUPPORTED" | "UNSUPPORTED" | "DEPRECATED";

    platforms?: {
        [key: string]: VersionDeviceFeatureFlags;
    };
};

export type FeatureFlags = {
    versions: {
        [key: string]: VersionFeatureFlags;
    };
};
