import { getDistance } from "geolib";
import { createActivity } from "../../../controllers/activities/createActivity";
import { getActivityById } from "../../../controllers/activities/getActivityById";
import { createActivitySummary } from "../../../controllers/activities/summary/createActivitySummary";
import { getActivitySummaryById } from "../../../controllers/activities/summary/getActivitySummaryById";
import { getBikeById } from "../../../controllers/bikes/getBikeById";
import { Bike } from "../../../models/bike";
import { getReverseGeocoding } from "../../../controllers/maps/getReverseGeocoding";

export const activitySummaryRequestSchema = {
    params: {
        activityId: {
            type: "string",
            required: true
        }
    }
};

export async function handleActivitySummaryRequest(request: Request, env: Env) {
    const { activityId } = request.params;

    const activity = await getActivityById(env.DATABASE, activityId);

    if(!activity)
        return Response.json({ success: false });

    let activitySummary = await getActivitySummaryById(env.DATABASE, activity.id);

    if(!activitySummary) {
        const bucket = await env.BUCKET.get(`activities/${activity.id}.json`);

        if(!bucket)
            return Response.json({ success: false });

        const sessions = await bucket.json<Array<any>>();

        let area = null;
        let distance = 0;
        let elevation = 0;
        let maxSpeed = 0;
        let comments = 0;

        if(sessions.length && sessions[0].locations.length) {
            const geocoding = await getReverseGeocoding(env.GOOGLE_MAPS_API_TOKEN, sessions[0].locations[0].coords.lat, sessions[0].locations[0].coords.lng);
            const geocodingResult = geocoding.results[0];
            const geocodingComponent = geocodingResult.address_components.find((component: any) => component.type === "postal_town") ?? geocodingResult.address_components.find((component: any) => component.type === "political") ?? geocodingResult.address_components.find((component: any) => component.type === "country");
        
            area = geocodingComponent?.long_name ?? null;
        }   

        const speeds = [];

        for(let session of sessions) {
            for(let index = 1; index < session.locations.length; index++) {
                distance += getDistance(session.locations[index - 1].coords, session.locations[index].coords, 1);

                speeds.push(session.locations[index].coords.speed);

                elevation += Math.max(0, session.locations[index].coords.altitude -session.locations[index - 1].coords.altitude);

                if(session.locations[index].coords.speed > maxSpeed)
                    maxSpeed = session.locations[index].coords.speed;
            }
        }

        const speedSum = speeds.reduce((a, b) => a + b, 0);
        const averageSpeed = (speedSum / speeds.length) || 0;

        activitySummary = await createActivitySummary(env.DATABASE, activity.id, area, distance, averageSpeed, elevation, maxSpeed, comments);
        
        if(!activitySummary)
            return Response.json({ success: false });
    }

    return Response.json({
        success: true,

        activitySummary: {
            area: activitySummary.area,
            distance: Math.round((activitySummary.distance / 1000) * 10) / 10,
            averageSpeed: Math.round((activitySummary.averageSpeed * 3.6) * 10) / 10,
            elevation: Math.round(activitySummary.elevation),
            maxSpeed: Math.round((activitySummary.maxSpeed * 3.6) * 10) / 10,
            comments: activitySummary.comments
        }
    });
};
