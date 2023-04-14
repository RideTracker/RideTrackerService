export async function getResponse(method: string, url: string, key: string | null, body: any = undefined): Promise<any> {
    const response = await fetch("https://service-staging.norasoderlund9092.workers.dev" + url, {
        method,
        headers: {
            "Authorization": (key)?(`Bearer ${key}`):(""),
            "Content-Type": "application/json"
        },
        body: (body !== undefined)?(JSON.stringify(body)):(undefined)
    });

    return await response.json();
};
