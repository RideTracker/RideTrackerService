export type ActivitySummary = {
    id: string;

    startArea: string | null;
    finishArea: string | null;

    distance: number;
    distancePersonalBest: boolean | null;

    averageSpeed: number;
    averageSpeedPersonalBest: boolean | null;

    elevation: number;
    elevationPersonalBest: boolean | null;

    maxSpeed: number;
    maxSpeedPersonalBest: boolean | null;
    
    timestamp: number;
};
