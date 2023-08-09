import { Client, InStatement } from "@libsql/client/web";
import DatabasePreparedStatement from "../databasePreparedStatement";

export default class TursoDatabasePreparedStatement implements DatabasePreparedStatement {
    constructor(private readonly client: Client, public readonly tursoPreparedStatement: InStatement) {
        this.client = client;
        this.tursoPreparedStatement = tursoPreparedStatement;
    };

    async run(): Promise<void> {
        await this.client.execute(this.tursoPreparedStatement);
    };

    async first<T>(columnName?: string): Promise<T | null> {
        const results = await this.all<T>();

        if(!results.length)
            return null;

        if(columnName)
            return (results[0] as any)[columnName];

        return results[0];
    };

    async all<T>(): Promise<T[]> {
        const result = await this.client.execute(this.tursoPreparedStatement);

        return result.rows as T[];
    };
};
