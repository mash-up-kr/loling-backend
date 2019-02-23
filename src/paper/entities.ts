import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '../room/entities';
import { User } from '../user/entities';


@Entity()
export class Paper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.createdPapers, { onDelete: 'SET NULL' })
    creator: User;

    @ManyToOne(() => Room, room => room.papers, { onDelete: 'SET NULL' })
    room: Room;

    @Column()
    createdAt: string;

    @Column()
    data: string;
}
