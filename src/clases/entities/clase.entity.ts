import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {  } from "class-validator";

@Entity({ name: 'clase'})
export class Clase {

    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    nombre: string;

    constructor(nombre: string){
        this.nombre = nombre;
    }

    public getId(): number{
        return this.id;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
}
