import getUserAgentGroups from "../controllers/getUserAgentGroups";
import { UserAgentGroups } from "./UserAgentGroups";

export default class UserAgent {
    private groups: UserAgentGroups;

    constructor(userAgentGroups: UserAgentGroups) {
        this.groups = userAgentGroups;
    };

    getClient() {
        return this.groups.client;
    };

    isBelow(userAgent: string | string[]) {
        if(typeof(userAgent) === "string") {
            const group = getUserAgentGroups(userAgent);

            if(!group)
                throw new Error("Invalid target group specified, cannot extract groups.");

            if(group.client !== this.groups.client)
                return false;

            if(this.groups.version.major > this.groups.version.major)
                return false;

            if(this.groups.version.minor > this.groups.version.minor)
                return false;

            if(this.groups.version.patch > this.groups.version.patch)
                return false;

            return true;
        }
        
        for(let index = 0; index < userAgent.length; index++) {
            if(this.isBelow(userAgent[index]))
                return true;
        }

        return false;
    };
};
