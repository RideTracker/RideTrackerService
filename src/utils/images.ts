export async function getDirectUploadUrl(env: Env, metadata: any | null) {
    const body = new FormData();

    if(metadata)
        body.append("metadata", JSON.stringify(metadata));

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`, {
        method: "POST",
        
        headers: {
            "Authorization": `Bearer ${env.CLOUDFLARE_API_IMAGES_TOKEN}`
        },
        body
    });

    const content = await response.json<any>();

    if(!content.success) {
        console.error("Failed to get direct upload url", content);

        return null;
    }

    return {
        id: content.result.id,
        url: content.result.uploadURL
    };
};

export async function getImage(env: Env, image: string) {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${image}`, {
        method: "GET",
        
        headers: {
            "Authorization": `Bearer ${env.CLOUDFLARE_API_IMAGES_TOKEN}`,
            "Content-Type": "application/json"
        }
    });

    const content = await response.json<any>();

    if(!content.success) {
        console.error("Failed to get image", content);

        return null;
    }

    return {
        id: content.result.id,
        filename: content.result.filename,
        metadata: content.result.metadata,
        draft: content.result.draft
    };
};

export async function deleteImage(env: Env, image: string) {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${image}`, {
        method: "DELETE",
        
        headers: {
            "Authorization": `Bearer ${env.CLOUDFLARE_API_IMAGES_TOKEN}`
        }
    });

    const content = await response.json<any>();

    if(!content.success) {
        console.error("Failed to delete image", content);

        return null;
    }

    return true;
};

export async function uploadImage(name: string, base64Image: string, url: string) {
    console.log("uploadImage");

    const mimeType = "image/png";
    
    const buffer = Buffer.from(base64Image.split(';base64,')[1], 'base64');
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([ uint8Array ], { type: mimeType });

    const body = new FormData();

    body.append("file", blob, name);

    const response = await fetch(url, {
        method: "POST",
        body
    });

    const content = await response.text();

    console.log("content", content);

    return JSON.parse(content);
};