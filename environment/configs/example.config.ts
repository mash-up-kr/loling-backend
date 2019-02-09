import { EnvironmentConfig } from '../environment-config';


const exampleConfig: EnvironmentConfig = {
    port: 5000,
    production: false,
    database: {
        type: 'mysql',
        url: 'mysql://localhost:5678/my_database',
    },
};


export default exampleConfig;
