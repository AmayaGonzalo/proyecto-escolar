import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {

  constructor(@InjectRepository(Estudiante)
              private estudianteRepository:Repository<Estudiante>)
  {}

  async create(estudianteDto: EstudianteDto): Promise<EstudianteDto> {   
    try{
      const estudiante: Estudiante = await this.estudianteRepository.save(new Estudiante(estudianteDto.nombre, estudianteDto.apellido, estudianteDto.fechaNacimiento))
        if(estudiante)
          return estudianteDto;
        else
          throw new Error('No se pudo crear el estudiante');
      }        
      catch(error){
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error en estudiante - ' + error
  
        },HttpStatus.NOT_FOUND)
      }  
    }  

  findAll() {
    return `This action returns all estudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, estudianteDto: EstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
