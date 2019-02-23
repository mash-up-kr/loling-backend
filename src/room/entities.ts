import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransformDay } from '../common/payloads';
import { Paper } from '../paper/entities';
import { User } from '../user/entities';


@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Paper, paper => paper.room)
    papers: Paper[];

    @ManyToOne(() => User, user => user.createdRooms, { onDelete: 'SET NULL' })
    creator: User;

    @ManyToOne(() => User, user => user.receivedRooms, { onDelete: 'SET NULL' })
    receiver: User;

    @Column()
    createdAt: string;

    @Column()
    receiverRead: boolean;

    @Column()
    @TransformDay()
    dueDay: string;
}
