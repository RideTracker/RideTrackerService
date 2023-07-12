import GoogleOAuth, { GoogleKey } from "cloudflare-workers-and-google-oauth"

export default async function getGoogleAuthKey(env: Env, scopes: string[]) {
    const googleAuth: GoogleKey = JSON.parse(env.GOOGLE_AUTH_CREDENTIALS)

    const oauth = new GoogleOAuth(googleAuth, scopes);
    const token = await oauth.getGoogleAuthToken();

    return token;
};
