import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environment } from '../environment';
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

    // 퀴리, 파라미터, 바디값을 검사합니다.
    // 'skipMissingProperties' 옵션을 활성화하여 누락된 프로퍼티는 검사를 하지 않습니다.
    // 따라서 꼭 존재해야 하는 프로퍼티는 '@IsDefined()' 데코레이터를 추가하시기 바랍니다.
    // 참조:
    //  https://github.com/typestack/class-validator#skipping-missing-properties
    app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

    const options = new DocumentBuilder()
        .setTitle('Loling 백엔드 API')
        .setHost('0ec805.emporter.eu')
        .setSchemes('https')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);


    await app.listen(environment.config.port);
}

bootstrap();
