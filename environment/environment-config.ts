export interface EnvironmentConfig {
    port: number;
    production: boolean;
    database: {
        type: 'postgres' | 'mysql' | 'mariadb' | 'mongodb' | 'sqlite';
        url?: string;
        database?: string; // This is for sqlite
    };
    aws?: {
        key: string;
        secret: string;
    };
}
