import D1DatabasePreparedStatement from "../statements/d1DatabasePreparedStatement";
import DatabasePreparedStatement from "../databasePreparedStatement";
import DatabaseSource from "../databaseSource";
import { DatabaseValue } from "../databaseValue";

export default class D1DatabaseSource implements DatabaseSource {
    constructor(private readonly d1database: D1Database) {
        this.d1database = d1database;
    };

    async batch<T>(preparations: D1DatabasePreparedStatement[]): Promise<T[][]> {
        const results = await this.d1database.batch<T>(preparations.map((preparedStatement) => preparedStatement.d1PreparedStatemnt));

        return results.map((result) => {
            return result.results ?? [];
        });
    };

    prepare(statement: string, ...args: DatabaseValue[]): DatabasePreparedStatement {
        return new D1DatabasePreparedStatement(this.d1database.prepare(statement).bind(...args));
    };
};
