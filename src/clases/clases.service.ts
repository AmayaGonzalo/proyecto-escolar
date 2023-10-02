import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { EstudianteClase } from 'src/estudiante/entities/estudianteClase.entity';

@Injectable()
export class ClasesService {

  constructor(@InjectRepository(Clase)
              private readonly claseRepository: Repository<Clase>,
              @InjectRepository(EstudianteClase)
              private readonly estudianteClaseRepository: Repository<EstudianteClase>
  ){}


  async create(claseDto: Clase): Promise<Clase>{
    // let clase: Clase = new Clase(claseDto.nombre);
    // await this.claseRepository.save(clase);
    try{
      const clase : Clase = await this.claseRepository.save(new Clase(claseDto.nombre));//lo mismo que las dos lineas comentadas de arriba
      if(clase)
        return clase;
    else
      throw new Error('No se pudo crear la clase');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en la clase - ' + error
      },HttpStatus.NOT_FOUND);
    }     
  }

  async findAll(): Promise<Clase[]> {
    try{
      const clase: Clase[] = await this.claseRepository.find({ relations : ['profesor'] });
      if(clase){
        return clase;
      }else{
        throw new Error('No se encontró la lista de clases');
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en la clase - ' + error
    },HttpStatus.NOT_FOUND);
    }    
  }

  async findAllwithRelations():Promise<EstudianteClase[]>{
    try{
      const estudianteClase: EstudianteClase[] = await this.estudianteClaseRepository.find({relations : ['clase', 'estudiante']});
      if(estudianteClase){
        return estudianteClase;
      }else{
        throw new Error('No se encontró la lista de clases con sus datos completos.');
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en la clase - ' + error
    },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<Clase> {
    try{
      const criterio: FindOneOptions = { where: { id : id}, relations: ['estudiantes'] };
      let clase : Clase = await this.claseRepository.findOne(criterio);

      if(clase)
        return clase;
      else
        throw new Error('No se encuentra la clase');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en la clase - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }

  async update(id: number, claseDto: Clase):Promise<String> {
    try{
      const criterio : FindOneOptions = { where: { id : id }};
      let clase : Clase = await this.claseRepository.findOne(criterio);
      let nombreViejo = clase.getNombre();
      if(clase){
        clase.setNombre(claseDto.getNombre());
        clase = await this.claseRepository.save(clase);
        if(clase){
          return `Se reemplazó: ${nombreViejo} --> ${clase.getNombre()}`;
        }else{
          return `No se pudo reemplazar`;
        }
      }else{
        throw new Error('No se encontró la clase para modificar');
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en la clase - ' + error
      },HttpStatus.NOT_FOUND)
    }     
  }

  async remove(id: number): Promise<any> {
    try{
      const criterio : FindOneOptions = { where: { id : id }};
      let clase : Clase = await this.claseRepository.findOne(criterio);
      if(!clase)
        throw new Error('No se pudo eliminar la clase');
      else{
          await this.claseRepository.remove(clase);
          return {
                  id: id,
                  nombre: clase.getNombre(),
                  message: 'se ha eliminado exitosamente'
                  }
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en la clase - ' + error

      },HttpStatus.NOT_FOUND);
    }       
  }
}
