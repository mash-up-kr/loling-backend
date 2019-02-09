import { IsDefined, IsEmail, IsInt, Length, Matches, ValidateNested } from 'class-validator';
import { Birthday } from '../common/payloads';


export class CreateUserPayload {
    @IsDefined()
    @Length(5, 15)
    id: string;

    @IsDefined()
    @Length(2, 24)
    name: string;

    @IsDefined()
    @Length(8, 50)
    password: string;

    @IsDefined()
    @ValidateNested()
    birthday: Birthday;

    @IsDefined()
    @Matches(/^0(?:1([0|1|6|7|8|9]+)|70|505)([0-9]{3,4})([0-9]{4})$/m)
    phoneNumber: string;

    @IsInt()
    profileImageId?: number;
}


export class SignInPayload {
    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    password: string;
}
