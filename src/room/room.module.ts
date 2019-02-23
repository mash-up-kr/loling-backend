import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaperModule } from '../paper/paper.module';
import { UserModule } from '../user/user.module';
import { Room } from './entities';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';


@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([Room]),
        PaperModule,
        UserModule,
        SwaggerModule,
    ],
    providers: [
        RoomService,
    ],
    controllers: [
        RoomController,
    ],
})
export class RoomModule {
}
