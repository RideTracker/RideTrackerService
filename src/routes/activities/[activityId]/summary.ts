import { getDistance } from "geolib";
import { createActivity } from "../../../controllers/activities/createActivity";
import { getActivityById } from "../../../controllers/activities/getActivityById";
import { createActivitySummary } from "../../../controllers/activities/summary/createActivitySummary";
import { getActivitySummaryById } from "../../../controllers/activities/summary/getActivitySummaryById";
import { getBikeById } from "../../../controllers/bikes/getBikeById";
import { Bike } from "../../../models/bike";
import { getReverseGeocoding } from "../../../controllers/maps/getReverseGeocoding";
import { getPersonalBestDistanceActivitySummaryByUser } from "../../../controllers/activities/summary/getPersonalBestDistanceActivityByUser";
import { getPersonalBestAverageSpeedActivityByUser } from "../../../controllers/activities/summary/getPersonalBestAverageSpeedActivityByUser";
import { getPersonalBestElevationActivitySummaryByUser } from "../../../controllers/activities/summary/getPersonalBestElevationActivityByUser";
import { getPersonalBestMaxSpeedActivityByUser } from "../../../controllers/activities/summary/getPersonalBestMaxSpeedActivityByUser";

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

        let startArea = null;
        let finishArea = null;
        let distance = 0;
        let elevation = 0;
        let maxSpeed = 0;

        if(sessions.length && sessions[0].locations.length) {
            async function getAreaName(coords: any) {
                const geocoding = await getReverseGeocoding(env.GOOGLE_MAPS_API_TOKEN, coords.latitude, coords.longitude);
    
                if(geocoding.results.length) {
                    const geocodingResult = geocoding.results[0];
    
                    const geocodingComponent = geocodingResult.address_components.find((component: any) => component.types.includes("postal_town")) ?? geocodingResult.address_components.find((component: any) => component.types.includes("political")) ?? geocodingResult.address_components.find((component: any) => component.types.includes("country"));
                
                    return geocodingComponent?.long_name ?? null;
                }

                return null;
            }

            await Promise.all([
                getAreaName(sessions[0].locations[0].coords).then((name) => startArea = name),
                getAreaName(sessions[sessions.length - 1].locations[sessions[sessions.length - 1].locations.length - 1].coords).then((name) => finishArea = name)
            ]);
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

        let distancePersonalBest = null;
        let averageSpeedPersonalBest = null;
        let elevationPersonalBest = null;
        let maxSpeedPersonalBest = null;

        await Promise.all([
            new Promise(async (resolve) => {
                const personalBest = await getPersonalBestDistanceActivitySummaryByUser(env.DATABASE, activity.user);

                if(!personalBest ||  distance > personalBest.distance) {
                    distancePersonalBest = true;

                    if(personalBest)
                        await env.DATABASE.prepare("UPDATE activity_summary SET distance_personal_best = NULL WHERE id = ?").bind(personalBest.id).run();
                }

                resolve(null);
            }),
            
            new Promise(async (resolve) => {
                const personalBest = await getPersonalBestAverageSpeedActivityByUser(env.DATABASE, activity.user);

                if(!personalBest ||  averageSpeed > personalBest.averageSpeed) {
                    averageSpeedPersonalBest = true;

                    if(personalBest)
                        await env.DATABASE.prepare("UPDATE activity_summary SET average_speed_personal_best = NULL WHERE id = ?").bind(personalBest.id).run();
                }

                resolve(null);
            }),
            
            new Promise(async (resolve) => {
                const personalBest = await getPersonalBestElevationActivitySummaryByUser(env.DATABASE, activity.user);

                if(!personalBest ||  elevation > personalBest.elevation) {
                    elevationPersonalBest = true;

                    if(personalBest)
                        await env.DATABASE.prepare("UPDATE activity_summary SET elevation_personal_best = NULL WHERE id = ?").bind(personalBest.id).run();
                }

                resolve(null);
            }),
            
            new Promise(async (resolve) => {
                const personalBest = await getPersonalBestMaxSpeedActivityByUser(env.DATABASE, activity.user);

                if(!personalBest ||  maxSpeed > personalBest.maxSpeed) {
                    maxSpeedPersonalBest = true;

                    if(personalBest)
                        await env.DATABASE.prepare("UPDATE activity_summary SET max_speed_personal_best = NULL WHERE id = ?").bind(personalBest.id).run();
                }

                resolve(null);
            })
        ]);

        activitySummary = await createActivitySummary(env.DATABASE, activity.id, startArea, finishArea, distance, distancePersonalBest, averageSpeed, averageSpeedPersonalBest, elevation, elevationPersonalBest, maxSpeed, maxSpeedPersonalBest);
        
        if(!activitySummary)
            return Response.json({ success: false });
    }

    return Response.json({
        success: true,

        activitySummary: {
            startArea: activitySummary.startArea,
            finishArea: activitySummary.finishArea,

            distance: Math.round((activitySummary.distance / 1000) * 10) / 10,
            distancePersonalBest: (activitySummary.distancePersonalBest) && activitySummary.distancePersonalBest,

            averageSpeed: Math.round((activitySummary.averageSpeed * 3.6) * 10) / 10,
            averageSpeedPersonalBest: (activitySummary.averageSpeedPersonalBest) && activitySummary.averageSpeedPersonalBest,

            elevation: Math.round(activitySummary.elevation),
            elevationPersonalBest: (activitySummary.elevationPersonalBest) && activitySummary.elevationPersonalBest,

            maxSpeed: Math.round((activitySummary.maxSpeed * 3.6) * 10) / 10,
            maxSpeedPersonalBest: (activitySummary.maxSpeedPersonalBest) && activitySummary.maxSpeedPersonalBest
        }
    });
};
