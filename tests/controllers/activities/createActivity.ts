import { expect } from "vitest";
import { getResponse } from "../../utils/response";
import { encode } from "@googlemaps/polyline-codec";

const places = [
    "Göteborg",
    "Kungsbacka",
    "Partille",
    "Mölndal",
    "Alingsås",
    "Trollhättan",
    "Vänersborg",
    "Borås",
    "Uddevalla",
    "Skövde",
    "Falkenberg",
    "Halmstad"
];

export async function createActivity(key: string) {
    const from = places[Math.floor(Math.random() * places.length)];
    
    let to = places[Math.floor(Math.random() * places.length)];

    while(to === from)
        to = places[Math.floor(Math.random() * places.length)];

    // @ts-ignore
    const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?mode=bicycling&origin=${from}&destination=${to}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_TOKEN}`);
    const result = await response.json() as any;

    const route = result.routes[0];

    if(!route)
        return;

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
        const response = await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${encode(coordinates, 5)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_TOKEN}`);
        const result = await response.json() as any;

        const altitudes = result.results;


        const speed = (15 + Math.floor(Math.random() * 10)) * 0.278;

        sessions.push({
            id: `<expect uuid>(${route.legs.indexOf(leg)})`,

            locations: leg.steps.map((step: any, index: number) => {
                return {
                    coords: {
                        accuracy: 1.0,
                        altitude: altitudes[index],
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

    const activity = await getResponse("POST", "/api/activities/create", key, {
        title: `${from} to ${to}`,
        description: null,
        bikeId: null,
        sessions
    });

    console.log("activity", activity);

    expect(activity.success).toBe(true);

    return activity;
};
