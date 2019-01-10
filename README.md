# Loling Backend

<img src="https://img.stackshare.io/service/8747/4zsOyxko_400x400.jpg" width="32" height="32"> <img src="https://img.stackshare.io/service/1612/bynNY5dJ.jpg" width="32" height="32">

## 요구사항

- [node.js](https://nodejs.org) >= 8.12.0
- npm >= 6


## 설치하기

```bash
git clone https://github.com/mash-up-kr/loling-backend
cd loling-backend/
npm install
```

## 환경 설정 추가

기본값으로 `LB_ENV` 값은 'local_dev' 입니다.

'environment/configs/' 경로에 **'local_dev.config.ts'** 파일을 추가하고 'example.config.ts' 파일을 참고하여 환경 설정을 추가하세요.

```typescript
import { EnvironmentConfig } from '../environment-config';


const localDevConfig: EnvironmentConfig = {
    port: 3500,
    database: {
        type: 'sqlite',
        database: './local_dev.sqlite',
    },
};


export default localDevConfig;
``` 

## 개발

```bash
npm run start  # 서버를 실행합니다.
npm run start:dev  # 파일 변경이 이루어질 때마다 서버를 자동 재실행합니다.

npm run build  # TypeScript를 빌드합니다. 'dist/' 폴더에 컴파일된 JavaScript 파일이 위치합니다.
npm run start:prod  # 'dist/main.js'로 서버를 실행합니다.

npm run lint  # Lint 검사를 합니다.
npm run test  # 테스트를 수행합니다.
```
