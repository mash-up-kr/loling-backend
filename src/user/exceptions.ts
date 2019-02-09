import { HttpStatus } from '@nestjs/common';
import { ClientReadableException } from '../shared';


export enum UserExceptionCodes {
    NOT_FOUND = 'user.notFound',
    DUPLICATED_USER_ID = 'user.userIdDuplicated',
    DUPLICATED_PHONE_NUMBER = 'user.userPhoneNumberDuplicated',
}


export class UserNotFoundException extends ClientReadableException {
    constructor() {
        super(HttpStatus.NOT_FOUND, {
            code: UserExceptionCodes.NOT_FOUND,
            message: '사용자를 찾을 수 없습니다.',
        });
    }
}


export class UserDuplicatedUserIdException extends ClientReadableException {
    constructor() {
        super(HttpStatus.CONFLICT, {
            code: UserExceptionCodes.DUPLICATED_USER_ID,
            message: '중복된 사용자 ID 입니다.',
        });
    }
}


export class UserDuplicatedPhoneNumberException extends ClientReadableException {
    constructor() {
        super(HttpStatus.CONFLICT, {
            code: UserExceptionCodes.DUPLICATED_PHONE_NUMBER,
            message: '중복된 휴대폰번호 입니다.',
        });
    }
}


export type UserException =
    UserNotFoundException
    | UserDuplicatedUserIdException
    | UserDuplicatedPhoneNumberException;
