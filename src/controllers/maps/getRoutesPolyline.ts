import { RoutesPoylineResponse } from "../../models/RoutesPoylineResponse";

export async function getRoutesPolyline(googleMapsApiToken: string, waypoints: { latitude: number; longitude: number; }[]): Promise<RoutesPoylineResponse> {
    const response = await fetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
        method: "POST",
        headers: {
            "X-Goog-Api-Key": googleMapsApiToken,
            "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
        },
        body: JSON.stringify({
            origin: {
                location: {
                    latLng: waypoints[0]
                }
            },

            destination: {
                location: {
                    latLng: waypoints[waypoints.length - 1]
                }
            },

            travelMode: "BICYCLE"
        })
    });

    console.log("google maps: " + response.status + " " + response.statusText);

    const result = await response.json<RoutesPoylineResponse>();

    return result;
};
