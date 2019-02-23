import { Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


export class FindRoomsQuery {
    @ApiModelProperty({
        description: '페이퍼 받는 사용자의 휴대폰번호. - 없이 숫자만',
        example: '01012341234',
        required: true,
    })
    @Matches(/^0(?:1([0|1|6|7|8|9]+)|70|505)([0-9]{3,4})([0-9]{4})$/m)
    phoneNumber?: string;
}
