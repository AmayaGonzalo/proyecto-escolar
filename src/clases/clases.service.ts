import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ClasesService {

  constructor(
    @InjectRepository(Clase)
    private claseRepository: Repository<Clase>
    ){}


  async create(claseDto: Clase): Promise<Clase>{
    // let clase: Clase = new Clase(claseDto.nombre);
    // await this.claseRepository.save(clase);
    try{
      let clase : Clase = await this.claseRepository.save(new Clase(claseDto.nombre));//lo mismo que las dos lineas comentadas de arriba
      if(clase)
        return clase;
    else
      throw new Error('No se pudo crear la clase');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en la clase - ' + error

      },HttpStatus.NOT_FOUND)
    }     
  }

  async findAll(): Promise<Clase[]> {
    return await this.claseRepository.find({ relations : ['estudiantes'] })
  }

  async findOne(id: number) {
    try{
      let criterio: FindOneOptions = { where: { id : id}, relations: ['estudiantes'] };
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

      },HttpStatus.NOT_FOUND)
    }    
  }

  async update(id: number, claseDto: Clase) {
    try{
      const criterio : FindOneOptions = { where: { id : id }};
      let clase : Clase = await this.claseRepository.findOne(criterio);
      let nombreViejo = clase.getNombre();
      if(clase){
        clase.setNombre(claseDto.getNombre());
        clase = await this.claseRepository.save(clase);
        if(clase)
          return `Se reemplazó: ${nombreViejo} --> ${clase.getNombre()}`;
        else 
          return `No se pudo reemplazar`;
      }
      else
        throw new Error('No se encontró la clase para modificar');           
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

      },HttpStatus.NOT_FOUND)
    }       
  }
}
