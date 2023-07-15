export type Activity = {
    id: string;
    user: string;
    title: string | null;
    description: string | null;
    bike: string | null;
    polylines: string | null;
    startArea: string | null;
    finishArea: string | null;
    status: "created" | "processed" | "deleted";
    timestamp: number;
};
