export type RoutesPoylineResponse = {
    routes: {
        legs: {
            polyline: {
                encodedPolyline: string;
            };

            steps: {
                polyline: {
                    encodedPolyline: string;
                }
            }[];
        }[];
        distanceMeters: number;
        duration: string;
        polyline: {
            encodedPolyline: string;
        };
    }[];
};
