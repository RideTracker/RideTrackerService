export default function getCookie(cookies: string, key: string) {
    const name = key + "=";

    const cookieSections = cookies.split(';');

    for (let index = 0; index < cookieSections.length; index++) {
        let cookie = cookieSections[index];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    
    return "";
}
