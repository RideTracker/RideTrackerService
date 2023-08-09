export default interface DatabasePreparedStatement {
    run(): Promise<void>;
    
    first<T>(columnName?: string): Promise<T | null>;
    all<T>(): Promise<T[]>;
};
