import DatabasePreparedStatement from "../databasePreparedStatement";

export default class D1DatabasePreparedStatement implements DatabasePreparedStatement {
    constructor(public readonly d1PreparedStatemnt: D1PreparedStatement) {
        this.d1PreparedStatemnt = d1PreparedStatemnt;
    };

    async run(): Promise<void> {
        await this.d1PreparedStatemnt.run();
    };

    async first<T>(columnName?: string): Promise<T> {
        const result = await this.d1PreparedStatemnt.first<T>(columnName);

        return result;
    };

    async all<T>(): Promise<T[]> {
        const result = await this.d1PreparedStatemnt.all<T>();

        return result.results ?? [];
    };
};
