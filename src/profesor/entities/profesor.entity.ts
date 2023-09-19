import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'profesor' })
export class Profesor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    constructor(nombre: string, apellido: string){
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public getId(): number{
        return this.id;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getApellido(): string{
        return this.apellido;
    }

    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }
    
    public setApellido(apellido: string):void{
        this.apellido = apellido;
    }
}
