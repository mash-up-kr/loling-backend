import { HttpStatus } from '@nestjs/common';
import { ClientReadableException } from 'src/shared';


export enum AuthExceptionCodes {
    UNAUTHORIZED = 'auth.unauthorized',
}


export class AuthUnauthorizedException extends ClientReadableException {
    constructor() {
        super(HttpStatus.UNAUTHORIZED, {
            code: AuthExceptionCodes.UNAUTHORIZED,
            message: '인증에 실패하였습니다.',
        });
    }
}


export type AuthException =
    AuthUnauthorizedException;
