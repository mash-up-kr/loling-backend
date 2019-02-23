import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities';
import { Paper } from './entities';
import { CreatePaperPayload } from './payloads';


@Injectable()
export class PaperService {
    constructor(
        @InjectRepository(Paper) private paperRepository: Repository<Paper>,
    ) {
    }

    async createPaper(creator: User, payload: CreatePaperPayload): Promise<Paper> {
        const paper = new Paper();

        paper.creator = creator;
        paper.createdAt = new Date().toISOString();
        paper.data = payload.data;

        await this.paperRepository.save(paper);

        return paper;
    }
}
