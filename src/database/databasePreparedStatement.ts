export default interface DatabasePreparedStatement {
    run(): Promise<void>;
    
    first<T>(columnName?: string): Promise<T>;
    all<T>(): Promise<T[]>;
};
