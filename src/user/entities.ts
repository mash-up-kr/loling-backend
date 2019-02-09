import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Birthday } from '../common/payloads';


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
    @Transform((birthday) => {
        const birthdayDate = new Date(birthday);

        return {
            year: birthdayDate.getFullYear(),
            month: birthdayDate.getMonth() + 1,
            day: birthdayDate.getDate(),
        } as Birthday;
    })
    birthday?: string;

    @Column()
    createdDatetime: string;

    @Column()
    anonymous: boolean;

    @Column({
        nullable: true,
    })
    @Exclude()
    passwordSalt: string;
}
