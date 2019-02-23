import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import * as mimeTypes from 'mime-types';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CommonFile } from './entities';


// elasticbeanstalk-ap-northeast-2-967484304891

@Injectable()
export class StorageService {
    private s3 = new AWS.S3({
        region: 'ap-northeast-2',
    });

    constructor(
        @InjectRepository(CommonFile) private fileRepository: Repository<CommonFile>,
    ) {
    }

    async uploadFile(
        filename: string,
        extname: string,
        data: Buffer,
    ): Promise<CommonFile | null> {
        const fullName = `${filename}${extname}`;
        const contentType = mimeTypes.contentType(fullName);
        const path = `${v4()}/${fullName}`;

        const url = await this.s3.getSignedUrl('putObject', {
            Bucket: 'static.loling',
            Key: path,
            ContentType: contentType,
        });

        const response = await this.s3.upload({
            Bucket: 'static.loling',
            Key: path,
            Body: data,
            ContentType: contentType,
            ACL: 'public-read',
        }).promise();

        console.log(response);

        if (!response || !response.ETag) {
            return null;
        }

        const file = new CommonFile();
        file.filename = filename;
        file.extension = extname;
        file.url = url;

        return await this.fileRepository.save(file);
    }
}
