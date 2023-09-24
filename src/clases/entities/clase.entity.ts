import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { EstudianteClase } from "src/estudiante/entities/estudianteClase.entity";

@Entity({ name: 'clase'})
export class Clase {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ManyToOne(()=>Profesor,profesor=>profesor.clases)
    @JoinColumn({name: "fk_id_profesor"})
    profesor:Profesor;

    @ManyToOne(()=> Escuela, escuela=>escuela.clases)
    @JoinColumn({ name: "fk_id_escuela"})
    escuela: Escuela;

    // @ManyToMany(()=>Estudiante,estudiantes=>estudiantes.clases)
    // @JoinTable({ name : "clases_estudiantes"})
    // public estudiantes : Estudiante[];

    @OneToMany(()=>EstudianteClase, estudianteClases=> estudianteClases.clase)
    estudianteClases: EstudianteClase;

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
