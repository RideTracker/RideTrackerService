export async function getReverseGeocoding(key: string, latitude: number, longitude: number) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`);
    
    return await response.json<any>();
};
