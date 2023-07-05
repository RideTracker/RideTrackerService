import { ActivitySummaryKey } from "./ActivitySummaryKey";

export type ActivitySummary = {
    id: string;
    key: ActivitySummaryKey;
    value: number;
    personalBest: boolean;
    timestamp: number;
};
