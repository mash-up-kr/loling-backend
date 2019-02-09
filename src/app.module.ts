import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environment';
import { UserModule } from './user/user.module';


@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...(environment.config.database as any),
            entities: [__dirname + '/**/entities.ts'],
            synchronize: true,
        }),
        UserModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
})
export class AppModule {
}
