import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parseDay } from '../common/payloads';
import { Omit } from '../common/types';
import { PaperService } from '../paper/paper.service';
import { CreatePaperPayload } from '../paper/payloads';
import { UserService } from '../user/user.service';
import { Room } from './entities';
import { CreateRoomPayload } from './payloads';


@Injectable()
export class RoomService {
    constructor(
        private userService: UserService,
        private paperService: PaperService,
        @InjectRepository(Room) private roomRepository: Repository<Room>,
    ) {
    }

    async getRoomById(roomId: number): Promise<Room | undefined> {
        return await this.roomRepository.findOne(roomId, {
            relations: ['papers', 'papers.creator', 'creator', 'receiver'],
        });
    }

    async getAllRooms(): Promise<Room[]> {
        return await this.roomRepository.find({
            relations: ['creator', 'receiver'],
        });
    }

    async findRoomsByPhoneNumber(phoneNumber: string): Promise<Room[]> {
        let user = await this.userService.getUserByPhoneNumber(phoneNumber);

        if (!user) {
            user = await this.userService.getUserByEncryptedPhoneNumber(phoneNumber);
        }

        if (!user) {
            return [];
        }

        const rooms = await this.roomRepository.find({
            relations: ['papers', 'papers.creator', 'creator', 'receiver'],
        });

        return rooms.filter(room => room.receiver.id === user.id);
    }

    async updateRoomReadStatus(roomId: number, read: boolean): Promise<void> {
        const room = await this.getRoomById(roomId);

        room.receiverRead = read;
        await this.roomRepository.save(room);
    }

    async createRoom(
        creatorId: number,
        roomData: Omit<CreateRoomPayload, 'anonymousReceiver'>,
    ): Promise<Room> {
        const creator = await this.userService.getUserById(creatorId);
        const receiver = await this.userService.getUserById(roomData.receiverId);

        const room = new Room();
        room.creator = creator;
        room.receiver = receiver;
        room.receiverRead = false;
        room.createdAt = new Date().toISOString();
        room.dueDay = parseDay(roomData.dueDay).toISOString();

        await this.roomRepository.save(room);

        return this.getRoomById(room.id);
    }

    async createRoomForAnonymous(
        creatorId: number,
        roomData: Omit<CreateRoomPayload, 'receiverId'>,
    ): Promise<Room> {
        const receiver = await this.userService.createAnonymousUser(roomData.anonymousReceiver);

        return this.createRoom(creatorId, {
            ...roomData,
            receiverId: receiver.id,
        });
    }

    async createPaper(
        roomId: number,
        creatorId: number,
        payload: CreatePaperPayload,
    ): Promise<Room> {
        const room = await this.getRoomById(roomId);
        const creator = await this.userService.getUserById(creatorId);
        const paper = await this.paperService.createPaper(creator, payload);

        room.papers.push(paper);
        await this.roomRepository.save(room);

        return room;
    }
}
