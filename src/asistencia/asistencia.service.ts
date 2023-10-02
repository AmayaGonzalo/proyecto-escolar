import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AsistenciaDto } from './dto/asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { FindOneOptions, Repository } from 'typeorm';
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


  async create(asistenciaDto: AsistenciaDto):Promise<AsistenciaDto> {
    try{
      const { estudianteId, claseId } = asistenciaDto;
      const estudiante : Estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}});4
      if(!estudiante){
        throw new Error('No se encontró ese estudiante');
      }else{
        const clase:Clase = await this.claseRepository.findOne({where:{id:claseId}});
        if(!clase){
          throw new Error('No se encontró esa clase');
        }else{
          const estudianteClase:EstudianteClase = await this.estudianteClaseRepository.findOne({ where:{estudianteId:estudianteId, claseId:claseId} });
          if(!estudianteClase){
            throw new Error('El estudiante no esta asignado a esa clase, primero debes asignarlo');
          }else{
            return await this.asistenciaRepository.save(new Asistencia(claseId, estudianteId, new Date() ));
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
            throw new Error('Oopss el estudiante no posee asistencia');
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

  async removeAsistencia(body):Promise<any>{
    try{
      const { estudianteId, claseId } = body;
      const estudiante: Estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}});
      if(!estudiante){
        throw new Error('No existe ese estudiante');
      }else{
        const clase:Clase = await this.claseRepository.findOne({where:{id:claseId}});
        if(!clase){
          throw new Error('Es clase no existe');
        }else{
          const asistencia: Asistencia = await this.asistenciaRepository.findOne({where:{claseId:claseId, estudianteId:estudianteId}});
          if(!asistencia){
            throw new Error('El estudiante no posee ninguna asistencia en esa clase');
          }else{
            await this.asistenciaRepository.remove(asistencia);
            return 'Se ha eliminado la asistencia con éxito';
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


//-----------------------------------------------------------------


  // update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
  //   return `This action updates a #${id} asistencia`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} asistencia`;
  // }

}