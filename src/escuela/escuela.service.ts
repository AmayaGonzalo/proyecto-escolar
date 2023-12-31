import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EscuelaDto } from './dto/escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Clase } from 'src/clases/entities/clase.entity';

@Injectable()
export class EscuelaService {
constructor(@InjectRepository(Escuela)
            private readonly escuelaRepository:Repository<Escuela>,
            @InjectRepository(Ciudad)
            private readonly ciudadRepository:Repository<Ciudad>,
            @InjectRepository(Clase)
            private readonly claseRepository:Repository<Clase>
  ){}

  async findAll(): Promise<Escuela[]>{
    try{
      const escuela: Escuela[] = await this.escuelaRepository.find({ relations: ['ciudad']});
      if(escuela){
        return escuela;
      }else{
        throw new Error ('No se halló la lista de escuelas');
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Escuela - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async create(createEscuelaDto: EscuelaDto):Promise<EscuelaDto> {
    try{
      let newEscuela: Escuela= await this.escuelaRepository.save(new Escuela(createEscuelaDto.nombre,createEscuelaDto.domicilio));
      if(newEscuela){
        return newEscuela;
      }else{
        throw new Error('No se pudo crear una nueva Escuela');
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Escuela - ' + error
      },HttpStatus.NOT_FOUND);
    }   
  }
  
  async asignarClase(body):Promise<Escuela>{
    try{
      const { escuelaId, claseId } = body;
      let escuela: Escuela = await this.escuelaRepository.findOne({where:{id:escuelaId}});
      if(!escuela){
        throw new Error('No se encontró la escuela');
      }else{
        const clase: Clase = await this.claseRepository.findOne({ where: {id: claseId}});
        if(!clase){
          throw new Error('No se encontró la clase a asignar');
        }else{
          clase.escuela = escuela; // Asignamos la ciudad a la escuela a través de foreign key, es decir cargamos una foreign key
          await this.claseRepository.save(clase);
          escuela = await this.escuelaRepository
          .createQueryBuilder('escuela')
          .leftJoinAndSelect('escuela.clases', 'clase')
          .where('escuela.id = :escuelaId', { escuelaId })
          .getOne();
          if (!escuela) {
            throw new NotFoundException('No se encontró la escuela!.');
          }else{
            return escuela;
          }
        }
      }
    }
    catch(error){     
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuela - ' + error
        },HttpStatus.NOT_FOUND);      
    }
  }

  async asignarCiudadAEscuela(ciudadId:number, escuelaId:number):Promise<Escuela>{
    try{
      const ciudad:Ciudad = await this.ciudadRepository.findOne({ where:{id:ciudadId} });       
      if(!ciudad){
        throw new Error('No se encontró la ciudad');
      }else{
        const escuela: Escuela = await this.escuelaRepository.findOne({ where:{id:escuelaId }});
        if(!escuela){
          throw new Error('No se encontró la escuela');
        }else{
          escuela.ciudad = ciudad; // Asignamos la ciudad a la escuela a través de foreign key, es decir cargamos una foreign key
          await this.escuelaRepository.save(escuela);
          return escuela;
        }
      } 
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Escuela - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<Escuela> {
    try{
      const criterio: FindOneOptions = { where: { id: id}, relations:['ciudad']};
      const escuela: Escuela = await this.escuelaRepository.findOne(criterio);
      if(!escuela){
        throw new Error('No se encontró la escuela');
      }else{
        return escuela;
      }
    }
    catch(error){
      throw new HttpException({
      status: HttpStatus.CONFLICT,
        error: 'Error en Escuela - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateEscuelaDto: UpdateEscuelaDto):Promise<any> {
    try{
      const criterio: FindOneOptions = { where: {id:id}}
      let escuela: Escuela = await this.escuelaRepository.findOne(criterio);
      if(!escuela){
        throw new Error('No se encontró la escuela a modificar');
      }else{
        let nombreViejo = escuela.getNombre();
        let domicilioViejo = escuela.getDomicilio();
        if(updateEscuelaDto.nombre != null || updateEscuelaDto.nombre != undefined){
          escuela.setNombre(updateEscuelaDto.nombre);
          escuela = await this.escuelaRepository.save(escuela);          
        }
        if(updateEscuelaDto.domicilio != null || updateEscuelaDto.domicilio != undefined){
          escuela.setDomicilio(updateEscuelaDto.domicilio);
          escuela = await this.escuelaRepository.save(escuela);
        }
        return {
          "nombre anterior" : nombreViejo,
          "nombre actual": escuela.nombre,
          "domicilio anterior": domicilioViejo,
          "domicilio actual": escuela.domicilio
        }
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
          error: 'Error en Escuela - ' + error
        },HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<any> {
    try{
      const criterio: FindOneOptions = { where:{ id:id} };
      let escuela:Escuela = await this.escuelaRepository.findOne(criterio);
      if(!escuela){
        throw new Error('No se encuentra esa escuela');
      }else{
        await this.escuelaRepository.remove(escuela);
        return {
          message: "Se ha eliminado exitosamente",
          nombre: escuela.getNombre()
        }
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
          error: 'Error en Escuela - ' + error
        },HttpStatus.NOT_FOUND);
    }
  }    
}
