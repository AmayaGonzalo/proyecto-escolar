import { IsString } from "class-validator";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({ name: "ciudad_estudiante" })
export class CiudadEstudiante{

    @PrimaryGeneratedColumn()
    idDocmicilioEstudiante: number;

    @Column()
    @IsString()
    direccion: string;

    @ManyToOne(()=>Estudiante, estudiantes => estudiantes.ciudadEstudiante)
    @JoinColumn({ name : "fk_id_estudiante" })
    estudiantes : Estudiante;

    @ManyToOne(()=> Ciudad, ciudades=> ciudades.ciudadEstudiante)
    @JoinColumn({ name: "fk_id_ciudad" })
    ciudades : Ciudad;

    constructor(direccion: string){
        this.direccion = direccion;
    }

    public getId(): number{
        return this.idDocmicilioEstudiante;
    }
        
    public getDirecccion(): string{
        return this.direccion;
    }
    
    public setDireccion(direccion: string):void{
        this.direccion = direccion;
    }
}