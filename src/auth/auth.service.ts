import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities';
import { AuthJwtPayload, withToken } from './payloads';


export type UserWithToken = User & { token: string };


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async signInWithEmailAndPassword(
        userId: string,
        password: string,
    ): Promise<UserWithToken | null> {
        const user = await this.userService.getUserByUserId(userId);

        if (!user) {
            return null;
        }

        if (await this.userService.authorizeUserWithPassword(user, password)) {
            const payload: AuthJwtPayload = {
                id: user.id,
                userId: user.userId,
            };

            const token = this.jwtService.sign(payload);

            return withToken(user, token);
        } else {
            return null;
        }
    }

    async validateUser(payload: AuthJwtPayload): Promise<User | undefined> {
        return await this.userService.getUserById(payload.id);
    }
}
