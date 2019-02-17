import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from '../../environment';
import { User } from '../user/entities';
import { AuthService } from './auth.service';
import { AuthUnauthorizedException } from './exceptions';
import { AuthJwtPayload } from './payloads';


@Injectable()
export class HttpAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environment.config.auth.secretKey,
        });
    }

    // noinspection JSUnusedGlobalSymbols
    async validate(token: AuthJwtPayload): Promise<User> {
        const user = await this.authService.validateUser(token);

        if (!user) {
            throw new AuthUnauthorizedException();
        }

        return user;
    }
}
