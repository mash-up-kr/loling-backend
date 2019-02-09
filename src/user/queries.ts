import { IsDefined, Length, Matches } from 'class-validator';


export class FindUserByUserIdQuery {
    @IsDefined()
    @Length(5, 15)
    id: string;
}


export class FindUserByPhoneNumberQuery {
    @IsDefined()
    @Matches(/^0(?:1([0|1|6|7|8|9]+)|70|505)([0-9]{3,4})([0-9]{4})$/m)
    phoneNumber: string;
}


export type FindUserQuery =
    FindUserByUserIdQuery & FindUserByPhoneNumberQuery;
