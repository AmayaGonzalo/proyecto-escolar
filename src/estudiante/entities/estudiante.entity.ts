import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { Clase } from "src/clases/entities/clase.entity";

@Entity({ name : "estudiantes" })
export class Estudiante {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    apellido: string;

    @ManyToMany(()=>Clase, clases=>clases.estudiantes)
    clases: Clase[];

    constructor(nombre:string, apellido:string){
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

    public setApellido(apellido: string): void{
        this.apellido = apellido;
    }

}
