import { IsDefined, IsInt, ValidateNested } from 'class-validator';
import { Day } from '../common/payloads';
import { CreateAnonymousUserPayload } from '../user/payloads';
import { ApiModelProperty } from '@nestjs/swagger';


export class CreateRoomPayload {
    @ApiModelProperty({
        description: '친구에게 보낼 시에 사용자의 id 값을 입력합니다.',
        required: false,
    })
    @IsInt()
    receiverId?: number;

    @ApiModelProperty({
        description: '익명 사용자에게 보낼 시에 해당 값을 입력합니다.',
        required: false,
    })
    @ValidateNested()
    anonymousReceiver?: CreateAnonymousUserPayload;

    @ApiModelProperty({
        description: '페이퍼의 마감 기한입니다.',
        required: true,
    })
    @IsDefined()
    @ValidateNested()
    dueDay: Day;
}
