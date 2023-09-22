import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator"
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Clase } from "src/clases/entities/clase.entity";

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

    @ManyToOne(()=>Ciudad, ciudad=>ciudad.escuelas)
    @JoinColumn({name: "fk_id_ciudad"})
    ciudad: Ciudad;

    @OneToMany(()=> Clase, clase=>clase.escuela)
    public clases :Clase[];

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
