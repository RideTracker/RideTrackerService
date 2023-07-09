import { UserStatus } from "./UserStatus";

export type User = {
    id: string;
    
    email: string;
    password: string;
    
    firstname: string;
    lastname: string;

    avatar: string;
    status: UserStatus;
    
    timestamp: number;
};
