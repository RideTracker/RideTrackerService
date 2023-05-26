import fs from "fs";
import { encode } from "@googlemaps/polyline-codec";

const places = JSON.parse(fs.readFileSync("./tests/data/places.json", "utf-8"));

export async function createMockedSessions() {
    const cities = places[Math.floor(Math.random() * places.length)];

    let route = null;

    for(let index = 0; index < 10; index++) {
        const from = cities[Math.floor(Math.random() * cities.length)];
        let to = cities[Math.floor(Math.random() * cities.length)];
    
        while(to === from)
            to = cities[Math.floor(Math.random() * cities.length)];

        // @ts-ignore
        const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?mode=bicycling&origin=${from}&destination=${to}&key=${process.env.VITEST_GOOGLE_MAPS_API_TOKEN}`);
        const result = await response.json() as any;
    
        route = result.routes[0];
    
        if(route) {
            console.log({ from, to });
            
            break;
        }
    }

    if(!route)
        return null;

    const now = Date.now();
    const twelveMonthsAgo = now - 31536000000; // 31536000000 milliseconds = 1 year
    const timestamp = Math.floor(Math.random() * (now - twelveMonthsAgo)) + twelveMonthsAgo;

    const sessions = [];

    for(let leg of route.legs) {
        const coordinates = leg.steps.slice(0, Math.min(512, leg.steps.length)).map((step: any) => {
            return [
                step.start_location.lat, 
                step.start_location.lng
            ];
        });

        // @ts-ignore
        const response = await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=enc:${encode(coordinates, 5)}&key=${process.env.VITEST_GOOGLE_MAPS_API_TOKEN}`);
        const result = await response.json() as any;

        const altitudes = result.results;

        if(!result.results.length)
            console.error(result);

        const speed = (15 + Math.floor(Math.random() * 10)) * 0.278;

        sessions.push({
            id: `<expect uuid>(${route.legs.indexOf(leg)})`,

            locations: leg.steps.map((step: any, index: number) => {
                return {
                    coords: {
                        accuracy: 1.0,
                        altitude: altitudes[index].elevation,
                        altitudeAccuracy: 1.0,
                        heading: 0.0,
                        latitude: step.start_location.lat,
                        longitude: step.start_location.lng,
                        speed
                    },

                    timestamp
                }
            }),

            timestamp
        });
    }

    return sessions;
};
