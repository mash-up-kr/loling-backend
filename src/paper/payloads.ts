import { IsDefined } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


export class CreatePaperPayload {
    @ApiModelProperty({
        description: 'Paper에 저장할 데이터값. 아무 포맷이니 그냥 저장하면 됩니다.',
        required: true,
    })
    @IsDefined()
    data: string;
}
