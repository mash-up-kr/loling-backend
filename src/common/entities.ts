import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
    name: 'file',
})
export class CommonFile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    url: string;

    @Column({
        nullable: false,
    })
    filename: string;

    @Column({
        nullable: false,
    })
    extension: string;
}
