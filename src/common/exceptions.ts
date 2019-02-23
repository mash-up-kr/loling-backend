import { HttpStatus } from '@nestjs/common';
import { ClientReadableException } from '../shared';


export enum CommonFileExceptionCodes {
    CANNOT_UPLOAD = 'commonFile.cannotUpload',
}


export class CommonFileCannotUploadException extends ClientReadableException {
    constructor() {
        super(HttpStatus.I_AM_A_TEAPOT, {
            code: CommonFileExceptionCodes.CANNOT_UPLOAD,
            message: 'TEAPOT',
        });
    }
}
