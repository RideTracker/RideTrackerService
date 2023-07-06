import { Activity } from "../../models/activity";

function getTimestampByTimeline(timeline?: string) {
    switch(timeline) {
        case "week":
            return Date.now() - (7 * 24 * 60 * 60);
            
        case "month":
            return Date.now() - (30 * 24 * 60 * 60);
            
        case "half_year":
            return Date.now() - (6 * 30 * 24 * 60 * 60);

        case "year":
            return Date.now() - (12 * 30 * 24 * 60 * 60);

        case "lifetime":
        default:
            return 0;
    }
};

function getSortByOrder(order?: string) {
    switch(order) {
        case "distance":
            return "SELECT activity_summary.value FROM activity_summary WHERE activity_summary.key = 'distance' AND activity_summary.id = activities.id";

        case "average_speed":
            return "SELECT activity_summary.value FROM activity_summary WHERE activity_summary.key = 'average_speed' AND activity_summary.id = activities.id";

        case "highest_speed":
            return "SELECT activity_summary.value FROM activity_summary WHERE activity_summary.key = 'max_speed' AND activity_summary.id = activities.id";
            
        case "elevation":
            return "SELECT activity_summary.value FROM activity_summary WHERE activity_summary.key = 'elevation' AND activity_summary.id = activities.id";

        case "activity":
        default:
            return "activities.timestamp";
    }
};

export async function getActivitiesByFeed(database: D1Database, offset: number, search?: string, order?: string, timeline?: string): Promise<Activity[]> {
    const timestamp = getTimestampByTimeline(timeline);
    const sort = getSortByOrder(order);
    
    if(search?.length) {
        const query = await database.prepare(
            "SELECT activities.start_area AS startArea, activities.finish_area AS finishArea, activities.* FROM activities" +
            " LEFT JOIN users ON activities.user = users.id" +
            " WHERE" +
            " (" +
            "  (LOWER(activities.title) LIKE '%' || LOWER(?1) || '%')" +
            "  OR (LOWER(activities.description) LIKE '%' || LOWER(?1) || '%')" +
            "  OR (LOWER(users.firstname) || ' ' || LOWER(users.lastname) LIKE '%' || LOWER(?1) || '%')" +
            "  OR (LOWER(activities.start_area) LIKE '%' || LOWER(?1) || '%')" +
            "  OR (LOWER(activities.finish_area) LIKE '%' || LOWER(?1) || '%')" +
            " ) AND" +
            " (activities.timestamp > ?2) AND activities.status = 'processed'" +
            " ORDER BY (" + sort + ") DESC LIMIT 5 OFFSET ?3"
            ).bind(search, timestamp, offset).all<Activity>();
    
        return query.results ?? [];
    }

    const query = await database.prepare("SELECT activities.start_area AS startArea, activities.finish_area AS finishArea, activities.* FROM activities WHERE activities.status = 'processed' AND activities.timestamp > ?1 ORDER BY (" + sort + ") DESC LIMIT 5 OFFSET ?2").bind(timestamp, offset).all<Activity>();

    return query.results ?? [];
};
