import { Base64 } from "js-base64";

export default async function getGoogleAuthKey(env: Env) {
    const pem = env.GOOGLE_AUTH_PRIVATE_KEY.replace(/\n/g, '')

    const pemHeader = '-----BEGIN PRIVATE KEY-----';
    const pemFooter = '-----END PRIVATE KEY-----';

    if (!pem.startsWith(pemHeader) || !pem.endsWith(pemFooter)) {
        throw new Error('Invalid service account private key');
    }

    const pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);

    const buffer = Base64.toUint8Array(pemContents);

    const algorithm = {
        name: 'RSASSA-PKCS1-v1_5',
        hash: {
            name: 'SHA-256',
        }
    };

    const extractable = false;
    const keyUsages = ['sign'];

    const privateKey = await crypto.subtle.importKey('pkcs8', buffer, algorithm, extractable, keyUsages);

    const header = Base64.encodeURI(
        JSON.stringify({
            alg: 'RS256',
            typ: 'JWT',
            kid: env.GOOGLE_AUTH_CLIENT_ID,
        }),
    );

    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;

    const payload = Base64.encodeURI(
        JSON.stringify({
            iss: env.GOOGLE_AUTH_CLIENT_EMAIL,
            sub: env.GOOGLE_AUTH_CLIENT_EMAIL,
            aud: 'https://pubsub.googleapis.com/',
            exp,
            iat
        })
    );

    const textEncoder = new TextEncoder();
    const inputArrayBuffer = textEncoder.encode(`${header}.${payload}`);

    const outputArrayBuffer = await crypto.subtle.sign(
        { name: 'RSASSA-PKCS1-v1_5' },
        privateKey,
        inputArrayBuffer
    );

    const signature = Base64.fromUint8Array(new Uint8Array(outputArrayBuffer), true);

    return `${header}.${payload}.${signature}`;
};
