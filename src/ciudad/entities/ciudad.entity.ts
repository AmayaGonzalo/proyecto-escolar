import { Escuela } from "src/escuela/entities/escuela.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CiudadProfesor } from "./ciudad_profesor.entity";
import { CiudadEstudiante } from "./ciudad_estudiante.entity";


@Entity({name:"ciudad"})
export class Ciudad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(()=>Escuela, escuela=>escuela.ciudad)
    public escuelas: Escuela[];

    @OneToMany(()=>CiudadProfesor, ciudad_profesor=>ciudad_profesor.ciudad)
    public CiudadProfesor : CiudadProfesor[];

    @OneToMany(()=>CiudadEstudiante, ciudadEStudiante=>ciudadEStudiante.ciudades)
    public ciudadEstudiante : CiudadEstudiante[];


    constructor(nombre:string){
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