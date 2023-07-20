import { TokenType } from "./TokenType";

export type Token = {
    id: string;
    key: string;
    type: TokenType;
    user: string;
    email?: string;
    timestamp: number;
};
