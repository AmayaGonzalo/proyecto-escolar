import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator"

@Entity({ name: 'escuela' })
export class Escuela {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @Column()
    @IsString()
    domicilio: string;

    constructor(nombre: string, domicilio: string){
        this.domicilio = domicilio;
        this.nombre = nombre;
    }

    public getId(): number{
        return this.id;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getDomicilio(): string{
        return this.domicilio;
    }

    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
    
    public setDomicilio(domicilio: string):void{
        this.domicilio = domicilio;
    }
}
