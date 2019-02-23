import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Paper } from './entities';
import { PaperService } from './paper.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Paper]),
        UserModule,
    ],
    controllers: [],
    providers: [
        PaperService,
    ],
    exports: [
        PaperService,
    ],
})
export class PaperModule {
}
