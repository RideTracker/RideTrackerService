import { getPlaceGeocoding } from "../../controllers/maps/getPlaceGeocoding";
import { getRoutesPolyline } from "../../controllers/maps/getRoutesPolyline";
import { DatabaseSource } from "@ridetracker/authservice";
import { FeatureFlagsExecution } from "../../models/FeatureFlagsExecution";

export const mapsRouteSchema = {
    content: {
        waypoints: {
            type: "array",
            required: true,

            schema: {
                type: "object",
                
                schema: {
                    latitude: {
                        type: "number",
                        required: true
                    },
                    
                    longitude: {
                        type: "number",
                        required: true
                    }
                }
            }
        }
    }  
};

export async function handleMapsRouteRequest(request: RequestWithKey, env: Env, context: EventContext<Env, string, null>, databaseSource: DatabaseSource, featureFlags: FeatureFlagsExecution) {
    const { waypoints } = request.content;

    const result = await getRoutesPolyline(env.GOOGLE_MAPS_API_TOKEN, waypoints);

    if(!result.routes.length)
        return Response.json({ success: false });

    return Response.json({
        success: true,
        
        routes: result.routes.map((route) => {
            return {
                polyline: route.polyline.encodedPolyline,
                distance: route.distanceMeters,
                duration: route.duration
            };
        })
    });
};
