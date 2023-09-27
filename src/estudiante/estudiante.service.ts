import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { EstudianteClase } from './entities/estudianteClase.entity';

@Injectable()
export class EstudianteService {

  constructor(@InjectRepository(Estudiante)
              private estudianteRepository:Repository<Estudiante>,
              @InjectRepository(Clase)
              private claseRepository:Repository<Clase>,
              @InjectRepository(EstudianteClase)
              private estudianteClaseRepository:Repository<EstudianteClase>
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
  // async createConRelation(estudianteDto: EstudianteDto):Promise<boolean>{
  //   const clase:Clase= await this.claseRepository.findOne({ where: {id : 1 } });
  //   let estudiante:Estudiante = new Estudiante(estudianteDto.nombre, estudianteDto.apellido, estudianteDto.fechaNacimiento);
  //   if(clase)
  //     estudiante.clases = [clase];
  //     await this.estudianteRepository.save(estudiante);
  //   if(estudiante)
  //     return true;
  //   else
  //     return false;
  // }

  async addClase(body):Promise<any>{
    const { claseId, estudianteId } = body;

    const estudiante: Estudiante = await this.estudianteRepository.findOne({ where: {id: estudianteId}});
    if(!estudiante)
      return `Error - No se encontró el estudiante con el Id ${estudianteId}`;
    const clase = await this.claseRepository.findOne({ where:{ id: claseId}});
    if(!clase)
      return 'Error - No se encontró la clase';
    const claseEstudiante = await this.estudianteClaseRepository.findOne({ where: { claseId:claseId, estudianteId:estudianteId}});
    if(claseEstudiante)
      return 'Error - El estudiante ya tiene asignada esa clase';
    return await this.estudianteClaseRepository.save(new EstudianteClase(claseId,estudianteId));
  }

  async findAll():Promise<Estudiante[]> {
    return this.estudianteRepository.find();
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
