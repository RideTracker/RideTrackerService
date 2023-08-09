import { D1DatabaseSource, DatabaseSource, TursoDatabaseSource } from "@ridetracker/authservice";
import { FeatureFlags } from "../../models/FeatureFlags";

export default function getDatabaseSource(env: Env, featureFlags: FeatureFlags): DatabaseSource {
    switch(featureFlags.databaseSource) {
        case "D1":
            return new D1DatabaseSource(env.DATABASE);

        case "Turso":
            return new TursoDatabaseSource(env.TURSO_SERVICE_DATABASE_URL, env.TURSO_SERVICE_DATABASE_TOKEN);
    };
};
