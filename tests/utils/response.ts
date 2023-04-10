export async function getResponse(method: string, url: string, body: any = null): Promise<any> {
    const response = await fetch("https://test-service-staging.norasoderlund9092.workers.dev" + url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return await response.json();
};
