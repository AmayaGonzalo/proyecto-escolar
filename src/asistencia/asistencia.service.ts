import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { FindOneOptions, Repository, getManager } from 'typeorm';
import { EstudianteClase } from 'src/estudiante/entities/estudianteClase.entity';
import { EntityManager } from 'typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Clase } from 'src/clases/entities/clase.entity';


@Injectable()
export class AsistenciaService {

  constructor(
              private readonly entityManager: EntityManager,
              @InjectRepository(Asistencia)
              private readonly asistenciaRepository:Repository<Asistencia>,
              @InjectRepository(EstudianteClase)
              private readonly estudianteClaseRepository:Repository<EstudianteClase>,
              @InjectRepository(Estudiante)
              private readonly estudianteRepository:Repository<Estudiante>,
              @InjectRepository(Clase)
              private readonly claseRepository:Repository<Clase>)
  {}


  async create(createAsistenciaDto: CreateAsistenciaDto) {
    try{
      const { estudianteId, claseId } = createAsistenciaDto;
      const asistenciaEstudiante = await this.estudianteClaseRepository.findOne({ where:{estudianteId:estudianteId, claseId:claseId} });
      if(!asistenciaEstudiante){
        throw new Error('No se pudo asignar la asistencia');
      }else{
        return await this.asistenciaRepository.save(new Asistencia(claseId, estudianteId, new Date() ));
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Asistencia - ' + error  
      },HttpStatus.NOT_FOUND);
    }   
  }

  
  async getAsistenciaEstudianteClase(estudianteId: number, claseId: number): Promise<any> {
    try{
      const estudiante = await this.estudianteRepository.findOne({ where:{ id:estudianteId } });
      if(!estudiante){
        throw new Error('Ocurrió un error en estudiante');
      }else{
        const clase = await this.claseRepository.findOne({ where:{ id: claseId}});
        if(!clase){
          throw new Error('Ocurrió un error el clase');
        }else{
          const asistencia : Asistencia = await this.entityManager
          .createQueryBuilder(Asistencia, 'asistencia')
          .innerJoinAndSelect('asistencia.estudianteClase', 'estudianteClase')
          .innerJoinAndSelect('estudianteClase.estudiante', 'estudiante')
          .innerJoinAndSelect('estudianteClase.clase', 'clase')
          .where('estudiante.id = :estudianteId', { estudianteId })
          .andWhere('clase.id = :claseId', { claseId })
          .getOne();
          if(asistencia){
            return asistencia;
          }else{
            throw new Error('Oopss ocurrió un error inesperado');
          }         
        } 
      }         
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Asistencia - ' + error  
      },HttpStatus.NOT_FOUND);
    }
  }


  async getAsistenciaClase(claseId: number):Promise<Asistencia[]>{
    try{
      const asistencia = await this.entityManager
      .createQueryBuilder(Asistencia, 'asistencia')
      .innerJoinAndSelect('asistencia.estudianteClase','estudianteClase')
      .innerJoinAndSelect('estudianteClase.estudiante','estudiante')
      .innerJoinAndSelect('estudianteClase.clase','clase')
      .where('clase.id = :claseId', { claseId })
      .getMany();

      if(asistencia){
        return asistencia;
      }else{
        throw new Error('Ocurrió un error las asitencias de la clase');
      }  
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Asistencia - ' + error  
      },HttpStatus.NOT_FOUND);
    }
  }
      
  async findAll():Promise<Asistencia[]> {
    try{
      const asistencia = await this.asistenciaRepository.find({ relations:[ 'estudianteClase' ]});
      if(asistencia){
        return asistencia;
      }else{
        throw new Error('no se hallaron las asistencias');
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Asistencia - ' + error  
    },HttpStatus.NOT_FOUND);
    }
  }

  async removeAsistencia(estudianteId:number, claseId:number):Promise<any>{
    try{
      let criterio : FindOneOptions = { where: { estudianteId:estudianteId, claseId:claseId } };
      let asistencia: Asistencia = await this.asistenciaRepository.findOne(criterio);
      if(!asistencia){
        throw new Error('No se halló la asistencia del estudiante');        
      }else{
        await this.asistenciaRepository.remove(asistencia);
        return{                
          message: 'se ha eliminado exitosamente'
        }
      }
    }catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Asistencia - ' + error  
      },HttpStatus.NOT_FOUND);
    }
  }


//-----------------------------------------------------------------


  // update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
  //   return `This action updates a #${id} asistencia`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} asistencia`;
  // }

}