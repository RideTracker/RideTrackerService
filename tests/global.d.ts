declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITEST_SERVICE_API_URL: string;
            VITEST_SERVICE_API_TOKEN: string;
        }
    }
}

export {};
