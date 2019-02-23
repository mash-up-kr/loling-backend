import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonController } from './common.controller';
import { CommonFile } from './entities';
import { StorageService } from './storage.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([CommonFile]),
    ],
    controllers: [
        CommonController,
    ],
    providers: [
        StorageService,
    ],
    exports: [
        StorageService,
    ],
})
export class CommonModule {
}
