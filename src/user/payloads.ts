import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, Length, Matches, ValidateNested } from 'class-validator';
import { Day } from '../common/payloads';


export class CreateUserPayload {
    @ApiModelProperty({
        description: '사용자 ID. 5자 이상 15자 이하',
        required: true,
    })
    @IsDefined()
    @Length(5, 15)
    id: string;

    @ApiModelProperty({
        description: '이름. 2자 이상 24자 이하',
        required: true,
    })
    @IsDefined()
    @Length(2, 24)
    name: string;

    @ApiModelProperty({
        description: '비밀번호. 8자 이상 50자 이하',
        required: true,
    })
    @IsDefined()
    @Length(8, 50)
    password: string;

    @ApiModelProperty({
        description: '사용자의 생년월일',
        required: true,
    })
    @IsDefined()
    @ValidateNested()
    birthday: Day;

    @ApiModelProperty({
        description: '사용자 휴대폰번호. -없이 숫자만',
        required: true,
        example: '01012341234',
    })
    @IsDefined()
    @Matches(/^0(?:1([0|1|6|7|8|9]+)|70|505)([0-9]{3,4})([0-9]{4})$/m)
    phoneNumber: string;

    @IsInt()
    profileImageId?: number;
}


export class CreateAnonymousUserPayload {
    @ApiModelProperty({
        description: '사용자 휴대폰번호. -없이 숫자만',
        required: true,
        example: '01012341234',
    })
    @IsDefined()
    @Matches(/^0(?:1([0|1|6|7|8|9]+)|70|505)([0-9]{3,4})([0-9]{4})$/m)
    phoneNumber: string;
}
