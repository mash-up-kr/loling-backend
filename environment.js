class Environment {
    constructor(envName) {
        try {
            this.config = require(`./configs/${envName}.config.js`);
        } catch (error) {
            if (error.name === 'MODULE_NOT_FOUND') {
                throw new Error(`'${envName}'에 해당하는 환경이 없습니다.`);
            } else {
                throw error;
            }
        }
    }
}


module.exports = new Environment(process.env.BF_ENV_NAME || 'local_dev');
