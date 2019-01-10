import { EnvironmentConfig } from './environment-config';


class Environment {
    public readonly config: EnvironmentConfig;

    constructor(public readonly name: string) {
        try {
            this.config = require(`./configs/${name}.config.ts`).default as EnvironmentConfig;
        } catch (error) {
            if (error.name === 'MODULE_NOT_FOUND') {
                throw new Error(`"${name}" 이름의 환경 설정을 찾을 수 없습니다. `
                    + `"${name}.config.ts" 파일이 "environment/configs/" 경로에 위치해 있는지 확인해 주세요.`);
            } else {
                throw error;
            }
        }
    }
}


export const environment = new Environment(process.env.LB_ENV || 'local_dev');
