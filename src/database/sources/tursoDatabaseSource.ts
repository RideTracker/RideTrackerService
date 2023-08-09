import DatabasePreparedStatement from "../databasePreparedStatement";
import DatabaseSource from "../databaseSource";
import { DatabaseValue } from "../databaseValue";
import TursoDatabasePreparedStatement from "../statements/tursoDatabasePreparedStatement";

export default class TursoDatabaseSource implements DatabaseSource {
    batch<T>(preparations: DatabasePreparedStatement[]): Promise<T[][]> {
        throw new Error("Method not implemented.");
    };
    
    prepare(statement: string, ...args: DatabaseValue[]): DatabasePreparedStatement {
        return new TursoDatabasePreparedStatement();
    };
};
