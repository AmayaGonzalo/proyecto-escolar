import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Clase } from 'src/clases/entities/clase.entity';

@Injectable()
export class EstudianteService {

  constructor(@InjectRepository(Estudiante)
              private estudianteRepository:Repository<Estudiante>,
              @InjectRepository(Clase)
              private claseRepository:Repository<Clase>
              )
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

    //ver el id harcodeado
  async createConRelation(estudianteDto: EstudianteDto):Promise<boolean>{
    const clase:Clase= await this.claseRepository.findOne({ where: {id : 1 } });
    let estudiante:Estudiante = new Estudiante(estudianteDto.nombre, estudianteDto.apellido, estudianteDto.fechaNacimiento);
    if(clase)
      estudiante.clases = [clase];
      await this.estudianteRepository.save(estudiante);
    if(estudiante)
      return true;
    else
      return false;
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
