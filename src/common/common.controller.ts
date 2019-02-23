import { Controller, FileInterceptor, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import * as path from 'path';
import { CommonFileCannotUploadException } from './exceptions';
import { StorageService } from './storage.service';


interface FileObj {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}


@Controller('common')
export class CommonController {
    constructor(
        private storageService: StorageService,
    ) {
    }

    @Post('files')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: FileObj) {
        const extname = path.extname(file.originalname);
        const filename = path.basename(file.originalname, extname);

        try {
            return this.storageService.uploadFile(filename, extname, file.buffer);
        } catch (err) {
            console.error(err);
            throw new CommonFileCannotUploadException();
        }
    }
}
