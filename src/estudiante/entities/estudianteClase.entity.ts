import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Clase } from "src/clases/entities/clase.entity";
import { Asistencia } from "src/asistencia/entities/asistencia.entity";

@Entity({ name: "clase_estudiante"})
export class EstudianteClase{

    @PrimaryColumn()
    claseId: number;

    @PrimaryColumn()
    estudianteId: number;

    @ManyToOne(()=>Clase, clase=> clase.estudianteClases)
    @JoinColumn()
    clase: Clase;
    
    @ManyToOne(()=>Estudiante, estudiante=> estudiante.estudianteClases)
    @JoinColumn()
    estudiante: Estudiante;

    @OneToMany(()=> Asistencia, asistencias=>asistencias.estudianteClase)
    public asistencias :Asistencia[];

   
    constructor(claseId:number,estudianteId:number){
        this.claseId = claseId;
        this.estudianteId = estudianteId;
    }
}