import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { EstudianteClase } from 'src/estudiante/entities/estudianteClase.entity';

@Injectable()
export class AsistenciaService {

  constructor(@InjectRepository(Asistencia)
              private readonly asistenciaRepository:Repository<Asistencia>,
              @InjectRepository(EstudianteClase)
              private readonly estudianteClaseRepository:Repository<EstudianteClase>)
  {}


  async create(createAsistenciaDto: CreateAsistenciaDto) {
    const { estudianteId, claseId } = createAsistenciaDto;
    const asistenciaEstudiante = await this.estudianteClaseRepository.findOne({ where:{estudianteId:estudianteId, claseId:claseId} });
    if(!asistenciaEstudiante)
      return `No existe estudiante/clase`
    return await this.asistenciaRepository.save(new Asistencia(claseId, estudianteId, new Date() ))
  }

  async findAll():Promise<Asistencia[]> {
    return await this.asistenciaRepository.find({ relations:[ 'estudianteClase' ]});
  }

  async findOne(id1: number,id2:number):Promise<Asistencia> {
    const criterio: FindOneOptions = { where: { claseId: id1, estudianteId: id2 }};
    let asistencia :Asistencia = await this.asistenciaRepository.findOne(criterio);
    
    
    if(asistencia)
    return asistencia;
  else
    throw new Error('No se encuentra la asistencia de ese estudiante');
}
catch(error){
  throw new HttpException({
      status: HttpStatus.CONFLICT,
      error: 'Error en la asistencia - ' + error

  },HttpStatus.NOT_FOUND)
}    
  

  // update(id: number, updateAsistenciaDto: UpdateAsistenciaDto) {
  //   return `This action updates a #${id} asistencia`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} asistencia`;
  // }
}
