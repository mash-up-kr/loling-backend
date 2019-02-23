import { HttpStatus } from '@nestjs/common';
import { ClientReadableException } from '../shared';


export enum RoomExceptionCodes {
    INVALID_RECEIVER = 'room.invalidReceiver',
    RECEIVER_NOT_FOUND = 'room.receiverNotFound',
    CANNOT_CREATE_ITSELF = 'room.cannotCreateItself',
    DUE_DAY_SHOULD_BE_FUTURE = 'room.dueDayShouldBeFuture',
    NOT_FOUND = 'room.notFound',
    NOT_PARTICIPATED = 'room.notParticipated',
    RECEIVER_CANNOT_SEE = 'room.receiverCannotSee',
}


export class RoomNoReceiverException extends ClientReadableException {
    constructor() {
        super(HttpStatus.NOT_ACCEPTABLE, {
            code: RoomExceptionCodes.INVALID_RECEIVER,
            message: '방을 만들 대상자가 유효하지 않습니다.',
        });
    }
}


export class RoomReceiverNotFoundException extends ClientReadableException {
    constructor() {
        super(HttpStatus.NOT_FOUND, {
            code: RoomExceptionCodes.RECEIVER_NOT_FOUND,
            message: '방을 만들 대상자를 찾을 수 없습니다.',
        });
    }
}


export class RoomCannotCreateItselfException extends ClientReadableException {
    constructor() {
        super(HttpStatus.NOT_ACCEPTABLE, {
            code: RoomExceptionCodes.CANNOT_CREATE_ITSELF,
            message: '자기자신을 대상으로 방을 만들 수 없습니다.',
        });
    }
}


export class RoomDueDayShouldBeFutureException extends ClientReadableException {
    constructor() {
        super(HttpStatus.NOT_ACCEPTABLE, {
            code: RoomExceptionCodes.DUE_DAY_SHOULD_BE_FUTURE,
            message: '생일날짜는 현재보다 이전일 수 없습니다.',
        });
    }
}


export class RoomNotFoundException extends ClientReadableException {
    constructor() {
        super(HttpStatus.NOT_FOUND, {
            code: RoomExceptionCodes.NOT_FOUND,
            message: '방을 찾을 수 없습니다.',
        });
    }
}


export class RoomReceiverCannotSeeException extends ClientReadableException {
    constructor() {
        super(HttpStatus.FORBIDDEN, {
            code: RoomExceptionCodes.RECEIVER_CANNOT_SEE,
            message: '페이퍼를 받는 사람은 방에 들어갈 수 없습니다.',
        });
    }
}
