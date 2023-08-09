import DatabasePreparedStatement from "./databasePreparedStatement";
import { DatabaseValue } from "./databaseValue";

export default interface DatabaseSource {
    prepare(statement: string, ...args: DatabaseValue[]): DatabasePreparedStatement;
    batch<T>(preparations: DatabasePreparedStatement[]): Promise<T[][]>;
};
