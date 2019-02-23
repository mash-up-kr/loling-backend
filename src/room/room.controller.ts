import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isAfter } from 'date-fns';
import { parseDay } from '../common/payloads';
import { CreatePaperPayload } from '../paper/payloads';
import { User } from '../user/entities';
import { UserService } from '../user/user.service';
import { Room } from './entities';
import {
    RoomCannotCreateItselfException,
    RoomDueDayShouldBeFutureException,
    RoomNoReceiverException,
    RoomReceiverNotFoundException,
} from './exceptions';
import { RoomReceiverViewGuard } from './guards';
import { CreateRoomPayload } from './payloads';
import { FindRoomsQuery } from './queries';
import { RoomService } from './room.service';


@Controller('rooms')
export class RoomController {
    constructor(
        private userService: UserService,
        private roomService: RoomService,
    ) {
    }

    @UseGuards(AuthGuard())
    @Get('my-unread-rooms')
    async getMyUnreadRooms(@Req() request): Promise<Room[]> {
        const user = request.user as User;
        const rooms = await this.roomService.getAllRooms();

        return rooms.filter(room =>
            room.receiver.id === user.id && !room.receiverRead,
        );
    }

    @UseGuards(AuthGuard(), RoomReceiverViewGuard)
    @Post(':id/paper')
    async createComment(@Body() payload: CreatePaperPayload, @Req() request, @Param() params): Promise<Room> {
        const room = await this.roomService.getRoomById(+params.id);
        const user = request.user as User;

        return await this.roomService.createPaper(room.id, user.id, payload);
    }

    @UseGuards(AuthGuard(), RoomReceiverViewGuard)
    @Get(':id')
    async getRoom(@Param() params, @Req() request): Promise<Room> {
        const user = request.user as User;
        const room = await this.roomService.getRoomById(+params.id);

        if (user.id === room.receiver.id) {
            await this.roomService.updateRoomReadStatus(room.id, true);
        }

        return room;
    }

    @UseGuards(AuthGuard())
    @Post()
    async createRoom(@Body() payload: CreateRoomPayload, @Req() request) {
        const user = request.user as User;
        let room: Room;

        if (!isAfter(parseDay(payload.dueDay), new Date())) {
            throw new RoomDueDayShouldBeFutureException();
        }

        if (payload.receiverId) {
            if (payload.receiverId === user.id) {
                throw new RoomCannotCreateItselfException();
            }

            if (!await this.userService.getUserById(payload.receiverId)) {
                throw new RoomReceiverNotFoundException();
            }

            room = await this.roomService.createRoom(user.id, payload);
        } else if (payload.anonymousReceiver) {
            let receiver = await this.userService.getUserByPhoneNumber(
                payload.anonymousReceiver.phoneNumber,
            );

            if (!receiver) {
                receiver = await this.userService.getUserByEncryptedPhoneNumber(
                    payload.anonymousReceiver.phoneNumber,
                );
            }

            if (receiver) {
                room = await this.roomService.createRoom(user.id, {
                    ...payload,
                    receiverId: receiver.id,
                });
            } else {
                room = await this.roomService.createRoomForAnonymous(user.id, payload);
            }
        } else {
            throw new RoomNoReceiverException();
        }

        return room;
    }

    @UseGuards(AuthGuard())
    @Get()
    async getAllRooms(@Query() query: FindRoomsQuery): Promise<Room[]> {
        if (query && query.phoneNumber) {
            return await this.roomService.findRoomsByPhoneNumber(query.phoneNumber);
        } else {
            return await this.roomService.getAllRooms();
        }
    }
}
