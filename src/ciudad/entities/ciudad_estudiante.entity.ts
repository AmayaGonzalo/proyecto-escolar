import { IsString } from "class-validator";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({ name: "ciudad_estudiante" })
export class CiudadEstudiante{

    @PrimaryColumn()
    estudianteId: number;

    @PrimaryColumn()
    ciudadId: number;

    @Column()
    @IsString()
    direccion: string;

    @ManyToOne(()=>Estudiante, estudiante => estudiante.ciudadEstudiante)
    estudiante : Estudiante;

    @ManyToOne(()=> Ciudad, ciudad=> ciudad.ciudadEstudiante)
    ciudad : Ciudad;

    constructor(estudianteId:number,ciudadId:number,direccion: string){
        this.estudianteId = estudianteId;
        this.ciudadId = ciudadId;
        this.direccion = direccion;
    }
        
    public getDirecccion(): string{
        return this.direccion;
    }
    
    public setDireccion(direccion: string):void{
        this.direccion = direccion;
    }
}