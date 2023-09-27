import { IsDate } from "class-validator";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { EstudianteClase } from "src/estudiante/entities/estudianteClase.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: "asistencia" })
export class Asistencia {

    @PrimaryColumn({name:'estudianteClaseClaseId'})//
    claseId: number;

    @PrimaryColumn({name:'estudianteClaseEstudianteId'})
    estudianteId: number;

    @Column()
    @IsDate()
    //@CreateDateColumn() - se quita @Column() y en el constructor no iria 'fecha:Date' y en el AsistenciaServir quitar en el parametro
    fecha: Date;
    
    @ManyToOne(()=>EstudianteClase, estudianteClase=> estudianteClase.asistencias)
    @JoinColumn()
    estudianteClase: EstudianteClase;    
  

    constructor(claseId:number,estudianteId:number,fecha:Date){
        this.claseId = claseId;
        this.estudianteId = estudianteId;
        this.fecha = fecha;
    }

}
