import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";

@Entity({ name: 'clase'})
export class Clase {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    nombre: string;

    @ManyToOne(()=>Profesor,profesor=>profesor.clases)
    @JoinColumn({name: "fk_id_profesor"})
    profesor:Profesor;

    @ManyToOne(()=> Escuela, escuela=>escuela.clases)
    @JoinColumn({ name: "fk_id_escuela"})
    escuela: Escuela;

    @ManyToMany(()=>Estudiante,estudiantes=>estudiantes.clases)
    @JoinTable({ name : "clases_estudiantes"})
    public estudiantes : Estudiante[];

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
