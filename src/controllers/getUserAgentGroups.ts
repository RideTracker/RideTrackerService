export default function getUserAgentGroups(userAgent: string | null) {
    if(!userAgent)
        return null;

    const match = userAgent.match(/(?<client>[\w]+)\-(?<major>[0-9v]+)\.(?<minor>[0-9]+)\.(?<patch>[0-9]+)/);

    if(!match?.groups)
        return null;

    return {
        client: match.groups.client,
        version: {
            major: match.groups.major,
            minor: match.groups.minor,
            patch: match.groups.patch,

            toString: () => {
                return `${match.groups?.major}.${match.groups?.minor}.${match.groups?.patch}`;
            }
        }
    };
};
