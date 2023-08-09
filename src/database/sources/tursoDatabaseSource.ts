import { Client, createClient } from "@libsql/client/web";
import DatabasePreparedStatement from "../databasePreparedStatement";
import DatabaseSource from "../databaseSource";
import { DatabaseValue } from "../databaseValue";
import TursoDatabasePreparedStatement from "../statements/tursoDatabasePreparedStatement";

export default class TursoDatabaseSource implements DatabaseSource {
    private readonly client: Client;

    constructor(tursoUrl: string, tursoToken: string) {
        this.client = createClient({
            url: tursoUrl.replace("libsql://", "wss://"),
            authToken: tursoToken
        });
    };

    async batch<T>(preparations: TursoDatabasePreparedStatement[]): Promise<T[][]> {
        const results = await this.client.batch(preparations.map((preparedStatement) => preparedStatement.tursoPreparedStatement));

        return results.map((result) => {
            return result.rows as T[];
        });
    };
    
    prepare(statement: string, ...args: DatabaseValue[]): DatabasePreparedStatement {
        return new TursoDatabasePreparedStatement(this.client, {
            sql: statement,
            args: args
        });
    };
};
