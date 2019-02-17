import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { environment } from '../../environment';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpAuthStrategy } from './http-auth.strategy';


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: environment.config.auth.secretKey,
            signOptions: {
                expiresIn: environment.config.auth.expiresIn,
            },
        }),
        UserModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        HttpAuthStrategy,
    ],
})
export class AuthModule {
}
