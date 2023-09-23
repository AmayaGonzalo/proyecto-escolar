import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { Ciudad } from "./ciudad.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";

@Entity({ name: "ciudad_profesor" })
export class CiudadProfesor {

@PrimaryColumn()
ciudadId: number;

@PrimaryColumn()
profesorId: number;

@Column()
@IsNotEmpty()
@IsString()
domicilio: string;

@ManyToOne(()=>Ciudad, ciudad=>ciudad.CiudadProfesor)
ciudad: Ciudad;

@ManyToOne(()=>Profesor, profesor=>profesor.ciudadProfesor)
profesor: Profesor;


constructor(ciudadId:number, profesorId:number, domicilio:string){
    this.domicilio = domicilio;
    this.profesorId = profesorId;
    this.ciudadId = ciudadId;
}

public getDirecccion(): string{
    return this.domicilio;
}

public setDireccion(domicilio: string):void{
    this.domicilio = domicilio;
}

}