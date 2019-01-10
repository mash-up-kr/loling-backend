import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


// nodemon이 간혹 정상적으로 종료되지 않아 프로세스가 남아 있는 경우가 있습니다.
// 이 경우 포트 번호가 겹쳐 오류가 발생합니다.
// 아래 코드는 'SIGNINT' 이벤트가 발생하였을 때 프로세스가 정상적으로 종료될 수 있도록 보장합니다.
// 참조: https://github.com/remy/nodemon/issues/1025#issuecomment-308049864
process.on('SIGINT', () => {
    console.log('☠️');
    process.exit();
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
