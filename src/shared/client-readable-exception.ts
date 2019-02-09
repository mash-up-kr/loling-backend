import { HttpException, HttpStatus } from '@nestjs/common';


export interface ClientReadableExceptionResponse {
    readonly code: string;
    readonly message: string;
}


export abstract class ClientReadableException extends HttpException {
    public readonly code: string;

    protected constructor(
        status: HttpStatus,
        response: ClientReadableExceptionResponse,
    ) {
        super(response, status);
        this.code = response.code;
    }
}
