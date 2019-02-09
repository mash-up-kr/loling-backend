export interface EnvironmentConfig {
    port: number;
    production: boolean;
    database: {
        type: 'postgres' | 'mysql' | 'mariadb' | 'mongodb' | 'sqlite';
        url?: string;
        database?: string; // This is for sqlite
        host?: string;
        port?: number;
        username?: string;
        password?: string;
    };
    aws?: {
        key: string;
        secret: string;
    };
}
