import { VersionFeatureFlags } from "./FeatureFlags";

export type VersionDeviceFeatureFlags = {
    supersededBy?: string;
};

export type FeatureFlagsExecution = {
    databaseSource: "D1" | "Turso";

    version: VersionFeatureFlags;
};
