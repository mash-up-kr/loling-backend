import { IsDefined, MaxLength } from 'class-validator';


export interface AuthJwtPayload {
    readonly id: number;
    readonly userId: string;
}


export class SignInPayload {
    @IsDefined()
    @MaxLength(50)
    userId: string;

    @IsDefined()
    @MaxLength(50)
    password: string;
}


export function withToken<T>(entity: T, token: string): T & { token: string } {
    type EntityWithToken = T & { token: string };

    (entity as any).token = token;

    return entity as EntityWithToken;
}
