import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities';
import { AuthService, UserWithToken } from './auth.service';
import { AuthUnauthorizedException } from './exceptions';
import { SignInPayload } from './payloads';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Get()
    @UseGuards(AuthGuard())
    async authorize(@Req() request): Promise<User> {
        return request.user;
    }

    @Post('sign-in')
    async signIn(@Body() payload: SignInPayload): Promise<UserWithToken> {
        const userWithToken = await this.authService.signInWithEmailAndPassword(
            payload.userId,
            payload.password,
        );

        if (userWithToken === null) {
            throw new AuthUnauthorizedException();
        }

        return userWithToken;
    }
}
