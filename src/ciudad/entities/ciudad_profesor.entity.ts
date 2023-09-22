import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { Ciudad } from "./ciudad.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";

@Entity({ name: "ciudad_profesor" })
export class CiudadProfesor {

@PrimaryGeneratedColumn()
id: number;

@Column()
@IsNotEmpty()
@IsString()
direccion: string;

@ManyToOne(()=>Ciudad, ciudad=>ciudad.CiudadProfesor)
@JoinColumn({ name: "fk_id_ciudad"})
ciudad: Ciudad;

@ManyToOne(()=>Profesor, profesor=>profesor.ciudadProfesor)
@JoinColumn({ name: "fk_id_profesor"})
profesor: Profesor;


constructor(direccion:string){
    this.direccion = direccion;
}

public getId(): number{
    return this.id;
}


public getDirecccion(): string{
    return this.direccion;
}

public setDireccion(direccion: string):void{
    this.direccion = direccion;
}

}