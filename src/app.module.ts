import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environment';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './shared/logger.middleware';
import { UserModule } from './user/user.module';


@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...(environment.config.database as any),
            entities: [__dirname + '/**/entities.ts'],
            synchronize: true,
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({
                path: 'users',
                method: RequestMethod.POST,
            });
    }
}
