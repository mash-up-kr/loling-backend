import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransformDay } from '../common/payloads';
import { Paper } from '../paper/entities';
import { Room } from '../room/entities';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        unique: true,
    })
    userId?: string;

    @Column({
        nullable: true,
    })
    @Exclude()
    password?: string;

    @Column({
        nullable: true,
    })
    @Exclude()
    encryptedPhoneNumber?: string;

    @Column({
        nullable: true,
    })
    name?: string;

    @Column({
        nullable: true,
        unique: true,
    })
    phoneNumber?: string;

    @Column({
        nullable: true,
    })
    @TransformDay()
    birthday?: string;

    @Column()
    createdAt: string;

    @Column()
    anonymous: boolean;

    @Column({
        nullable: true,
    })
    @Exclude()
    passwordSalt: string;

    @OneToMany(() => Room, room => room.creator)
    createdRooms: Room[];

    @OneToMany(() => Room, room => room.receiver)
    receivedRooms: Room[];

    @OneToMany(() => Paper, paper => paper.creator)
    createdPapers: Room[];
}
