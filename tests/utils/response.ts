export async function getResponse(method: string, url: string, key: string | null, body: any = null): Promise<any> {
    const response = await fetch("https://service-staging.norasoderlund9092.workers.dev" + url, {
        method,
        headers: {
            "Authorization": key ?? "",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return await response.json();
};
