export type PollInput = {
    id: string;
    poll: string;
    title: string;
    type: "string" | "grade" | "list";
    choices?: string;
    index: number;
};
