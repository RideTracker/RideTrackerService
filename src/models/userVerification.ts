import { User } from "./user";

export type UserVerification = {
    id: string;
    user: User;

    code: string;
    timestamp: number;
};
