import DatabaseSource from "../../database/databaseSource";
import D1DatabaseSource from "../../database/sources/d1DatabaseSource";
import TursoDatabaseSource from "../../database/sources/tursoDatabaseSource";
import { FeatureFlags } from "../../models/FeatureFlags";

export default function getDatabaseSource(env: Env, featureFlags: FeatureFlags): DatabaseSource {
    switch(featureFlags.databaseSource) {
        case "D1":
            return new D1DatabaseSource(env.DATABASE);

        case "Turso":
            return new TursoDatabaseSource();
    };
};
