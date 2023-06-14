import { getPlaceGeocoding } from "../../controllers/maps/getPlaceGeocoding";
import { getRoutesPolyline } from "../../controllers/maps/getRoutesPolyline";

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

export async function handleMapsRouteRequest(request: Request, env: Env) {
    const { waypoints } = request.content;

    const result = await getRoutesPolyline(env.GOOGLE_MAPS_API_TOKEN, waypoints);

    if(!result.routes.length)
        return Response.json({ success: false });

    return Response.json({
        success: true,
        
        polylines: result.routes.map((route) => {
            return route.polyline.encodedPolyline;
        })
    });
};
