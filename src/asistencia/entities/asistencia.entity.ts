import { IsDate } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "asistencia" })
export class Asistencia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDate()
    fecha: Date;

}
