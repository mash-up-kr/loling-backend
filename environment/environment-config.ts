export interface EnvironmentConfig {
    port: number;
    database: {
        type: 'postgres' | 'mysql' | 'mariadb' | 'mongodb' | 'sqlite';
        url?: string;
        database?: string; // This is for sqlite
    };
}
