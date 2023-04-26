import { Activity } from "../../models/activity";

export async function getActivitiesByFeed(database: D1Database, search?: string, order?: string, timeline?: string): Promise<Activity[] | null> {
    if(search?.length) {
        const query = await database.prepare(
            "SELECT activities.* FROM activities" +
            " INNER JOIN activity_summary ON activities.id = activity_summary.id" +
            " INNER JOIN users ON activities.user = users.id" +
            " WHERE" +
            " (LOWER(activities.title) LIKE '%' || LOWER(?1) || '%')" +
            " OR (LOWER(activities.description) LIKE '%' || LOWER(?1) || '%')" +
            " OR (LOWER(users.firstname) || ' ' || LOWER(users.lastname) LIKE '%' || LOWER(?1) || '%')" +
            " OR (LOWER(activity_summary.start_area) LIKE '%' || LOWER(?1) || '%')" +
            " OR (LOWER(activity_summary.finish_area) LIKE '%' || LOWER(?1) || '%')" +
            " ORDER BY activities.timestamp DESC"
            ).bind(search).all<Activity>();
    
        return query.results ?? null;
    }

    const query = await database.prepare("SELECT * FROM activities ORDER BY timestamp DESC").all<Activity>();

    return query.results ?? null;
};
