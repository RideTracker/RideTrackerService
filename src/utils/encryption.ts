export async function encryptPassword(password: string) {
    // Generate a random salt using the Web Crypto API
    const salt = crypto.getRandomValues(new Uint8Array(16))

    // Derive a key using PBKDF2 with the Web Crypto API
    const passwordBuffer = new TextEncoder().encode(password)
    const key = await crypto.subtle.importKey(
        "raw", passwordBuffer, { name: "PBKDF2" }, false, ["deriveBits"]
    )
    const derivedBits = await crypto.subtle.deriveBits(
        { "name": "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, key, 256
    )

    // Convert the derived key to a Base64-encoded string and return the result
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(derivedBits)))) + '.' + btoa(String.fromCharCode.apply(null, Array.from(salt)));
};

export async function verifyPassword(password: string, hash: string) {
    // Parse the hash and salt from the encoded string
    const [hashString, saltString] = hash.split('.')
    const hashBuffer = new Uint8Array(atob(hashString).split('').map(c => c.charCodeAt(0)))
    const saltBuffer = new Uint8Array(atob(saltString).split('').map(c => c.charCodeAt(0)))

    // Derive the key using PBKDF2 with the Web Crypto API
    const passwordBuffer = new TextEncoder().encode(password)
    const key = await crypto.subtle.importKey(
        "raw", passwordBuffer, { name: "PBKDF2" }, false, ["deriveBits"]
    )
    const derivedBits = await crypto.subtle.deriveBits(
        { "name": "PBKDF2", salt: saltBuffer, iterations: 100000, hash: "SHA-256" }, key, 256
    )

    // Compare the derived key to the stored hash and return the result
    const derivedHash = new Uint8Array(derivedBits)

    return derivedHash.every((byte, i) => byte === hashBuffer[i])
};
