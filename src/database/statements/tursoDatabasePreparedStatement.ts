import DatabasePreparedStatement from "../databasePreparedStatement";

export default class TursoDatabasePreparedStatement implements DatabasePreparedStatement {
    run(): Promise<void> {
        throw new Error("Method not implemented.");
    };

    first<T>(columnName?: string | undefined): Promise<T> {
        throw new Error("Method not implemented.");
    };

    all<T>(): Promise<T[]> {
        throw new Error("Method not implemented.");
    };
};
