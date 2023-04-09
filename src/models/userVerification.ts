import { User } from "./user";

export type UserVerification = {
    id: string;
    user: string;

    code: string;
    timestamp: number;
};
