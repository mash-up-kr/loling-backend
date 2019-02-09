import { IsDefined, Matches, Max, Min } from 'class-validator';


export class Birthday {
    @IsDefined()
    @Matches(/^\d{4}$/)
    year: number;

    @IsDefined()
    @Matches(/^\d{1,2}$/)
    @Min(1)
    @Max(12)
    month: number;

    @IsDefined()
    @Matches(/^\d{1,2}$/)
    @Min(1)
    @Max(31)
    day: number;
}
