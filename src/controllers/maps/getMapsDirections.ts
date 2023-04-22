export async function getMapsDirections(key: string, from: string, to: string) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&key=${key}`);
    
    return await response.json();
};
