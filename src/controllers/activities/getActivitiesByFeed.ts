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

function getRelationsQuery(relations: string, index: number) {
    switch(relations) {
        default:
        case "everyone":
            return null;

        case "following":
            return "(SELECT COUNT(id) FROM user_follows WHERE user = ?" + index + " AND follow = activities.user) IS NOT 0";

        case "following_or_follows":
            return "(SELECT COUNT(id) FROM user_follows WHERE (user = ?" + index + " AND follow = activities.user) OR (user = activities.user AND follow = ?" + index + ")) IS NOT 0";
    }
};

export async function getActivitiesByFeed(database: D1Database, userId: string, offset: number, limit: number, relations: string, search?: string, order?: string, timeline?: string): Promise<Activity[]> {
    const timestamp = getTimestampByTimeline(timeline);
    const sort = getSortByOrder(order);
    
    const binds: any[] = [ timestamp, offset, limit, userId ];
    
    if(search?.length) {
        binds.push(search);

        const relationsQuery = getRelationsQuery(relations, 4);

        const query = await database.prepare(
            "SELECT activities.start_area AS startArea, activities.finish_area AS finishArea, activities.* FROM activities" +
            " LEFT JOIN users ON activities.user = users.id" +
            " WHERE" +
            " (" +
            "  (LOWER(activities.title) LIKE '%' || LOWER(?5) || '%')" +
            "  OR (LOWER(activities.description) LIKE '%' || LOWER(?5) || '%')" +
            "  OR (LOWER(users.firstname) || ' ' || LOWER(users.lastname) LIKE '%' || LOWER(?5) || '%')" +
            "  OR (LOWER(activities.start_area) LIKE '%' || LOWER(?5) || '%')" +
            "  OR (LOWER(activities.finish_area) LIKE '%' || LOWER(?5) || '%')" +
            " ) AND" +
            " (activities.timestamp > ?1) AND activities.status = 'processed'" +
            ((relationsQuery)?(" AND (" + relationsQuery + ")"):("")) +
            " AND ((activities.visibility = 'PUBLIC') OR (activities.visibility = 'PRIVATE' AND activities.user = ?4) OR (activities.visibility = 'FOLLOWERS_ONLY' AND (activities.user = ?4 OR (SELECT COUNT(id) FROM user_follows WHERE user = activities.user AND follow = ?4) IS NOT 0)))" +
            " ORDER BY (" + sort + ") DESC LIMIT ?3 OFFSET ?2"
            ).bind(...binds).all<Activity>();
    
        return query.results ?? [];
    }

    const relationsQuery = getRelationsQuery(relations, 4);

    const query = await database.prepare(
        "SELECT activities.start_area AS startArea, activities.finish_area AS finishArea, activities.* FROM activities" +
        " WHERE" +
        " (activities.status = 'processed' AND activities.timestamp > ?1) " +
        ((relationsQuery)?(" AND (" + relationsQuery + ")"):("")) +
        " AND ((activities.visibility = 'PUBLIC') OR (activities.visibility = 'PRIVATE' AND activities.user = ?4) OR (activities.visibility = 'FOLLOWERS_ONLY' AND (activities.user = ?4 OR (SELECT COUNT(id) FROM user_follows WHERE user = activities.user AND follow = ?4) IS NOT 0)))" +
        " ORDER BY (" + sort + ") DESC LIMIT ?3 OFFSET ?2"
        ).bind(...binds).all<Activity>();

    return query.results ?? [];
};
