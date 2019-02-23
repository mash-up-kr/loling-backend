import { Transform } from 'class-transformer';
import { IsDefined, Matches, Max, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


export class Day {
    @ApiModelProperty({
        description: '년도 숫자값',
        required: true,
    })
    @IsDefined()
    @Matches(/^\d{4}$/)
    year: number;

    @ApiModelProperty({
        description: '월 숫자값. 1부터 시작해서 12로 끝납니다.',
        required: true,
    })
    @IsDefined()
    @Matches(/^\d{1,2}$/)
    @Min(1)
    @Max(12)
    month: number;

    @ApiModelProperty({
        description: '일 숫자값',
        required: true,
    })
    @IsDefined()
    @Matches(/^\d{1,2}$/)
    @Min(1)
    @Max(31)
    day: number;
}


export function parseDay(day: Day): Date {
    return new Date(day.year, day.month - 1, day.day);
}


export const TransformDay = () => Transform((day) => {
    const date = new Date(day);

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
    } as Day;
});
