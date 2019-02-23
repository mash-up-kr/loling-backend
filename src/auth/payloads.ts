import { IsDefined, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


export interface AuthJwtPayload {
    readonly id: number;
    readonly userId: string;
}


export class SignInPayload {
    @ApiModelProperty({
        description: '사용자 ID',
        required: true,
    })
    @IsDefined()
    @MaxLength(50)
    userId: string;

    @ApiModelProperty({
        description: '사용자 비밀번호',
        required: true,
    })
    @IsDefined()
    @MaxLength(50)
    password: string;
}


export function withToken<T>(entity: T, token: string): T & { token: string } {
    type EntityWithToken = T & { token: string };

    (entity as any).token = token;

    return entity as EntityWithToken;
}
