export type ActivitySummary = {
    id: string;

    startArea: string | null;
    finishArea: string | null;
    distance: number;
    averageSpeed: number;
    elevation: number;
    maxSpeed: number;
    
    timestamp: number;
};
