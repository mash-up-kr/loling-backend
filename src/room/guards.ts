import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../user/entities';
import { RoomNotFoundException, RoomReceiverCannotSeeException } from './exceptions';
import { RoomService } from './room.service';


@Injectable()
export class RoomInvitationGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        return true;
    }
}


@Injectable()
export class RoomReceiverViewGuard implements CanActivate {
    constructor(
        private roomService: RoomService,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const roomId = +request.params.id;
        const room = await this.roomService.getRoomById(roomId);

        if (!room) {
            throw new RoomNotFoundException();
        }

        const user = request.user as User;

        if (room.receiver.id === user.id) {
            throw new RoomReceiverCannotSeeException();
        }

        return true;
    }
}
