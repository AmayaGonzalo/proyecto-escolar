import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Clase } from "src/clases/entities/clase.entity";
import { CiudadEstudiante } from "src/ciudad/entities/ciudad_estudiante.entity";
import { EstudianteClase } from "./estudianteClase.entity";

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

    @Column()
    @IsDate()
    fechaNacimiento: Date;

    // @ManyToMany(()=>Clase, clases=>clases.estudiantes)
    // clases: Clase[];

    @OneToMany(()=>CiudadEstudiante, ciudadEstudiante=>ciudadEstudiante.estudiante)
    ciudadEstudiante: CiudadEstudiante[];

    @OneToMany(()=>EstudianteClase, estudianteClases=> estudianteClases.estudiante)
    estudianteClases: EstudianteClase[];

    constructor(nombre:string, apellido:string, fechaNacimiento: Date){
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
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

    public getFechaNacimiento(): Date{
        return this.fechaNacimiento;
    }

    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }

    public setApellido(apellido: string): void{
        this.apellido = apellido;
    }

    public setFechaNacimiento(fechaNacimiento: Date): void{
        this.fechaNacimiento = fechaNacimiento;
    }

}
