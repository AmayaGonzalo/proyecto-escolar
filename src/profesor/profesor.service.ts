import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfesorDto } from './dto/profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';

@Injectable()
export class ProfesorService {

  constructor(@InjectRepository(Profesor)
              private readonly profesorRepository:Repository<Profesor>,
              @InjectRepository(Ciudad)
              private readonly ciudadRepository:Repository<Ciudad>,
              @InjectRepository(CiudadProfesor)
              private readonly ciudadProfesorRepository:Repository<CiudadProfesor>
              ){}

  async newProfesor(profesorDto: ProfesorDto):Promise<ProfesorDto> {
    try{
      let newProfesor: Profesor = await this.profesorRepository.save(new Profesor(profesorDto.nombre,profesorDto.apellido));
      if(newProfesor){
        return profesorDto;
      }else{
        throw new Error('No se pudo crear un nuevo profesor');
      }
    }catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Profesor - ' + error

      },HttpStatus.NOT_FOUND)
    }
  }

  async createDomicilio(body):Promise<any>{
    const { ciudadId, profesorId, domicilio } = body;

    //consultar y verificar si el profesor existe
    const profesor = await this.profesorRepository.findOne({ where:{ id: profesorId } });
    if(!profesor)
      return 'error - no existe el profesor';
    
    //consultar y verificar si la ciudad existe
    const ciudad = await this.ciudadRepository.findOne({ where:{ id: ciudadId}});
    if(!ciudad)
      return 'error - no existe esa ciudad'

    //si el id_profesor y id_ciudad existe dentro de ciudad_profesor(tabla)
    const newDomicilio = await this.ciudadProfesorRepository.findOne({ where:{ciudadId:ciudadId, profesorId:profesorId}});
    if(newDomicilio)
      return 'el profesor ya tiene asignado un domicilio';
    return await this.ciudadProfesorRepository.save(new CiudadProfesor(ciudadId, profesorId, domicilio));
  }

  async findAll():Promise<ProfesorDto[]> {
    try{
      let profesor: ProfesorDto[] = await this.profesorRepository.find();
      if(profesor){
        return profesor;
      }else{
        throw new Error('No se encontró la lista de profesores')
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Profesor - ' + error

      },HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: number):Promise<ProfesorDto> {
    try{
      let criterio: FindOneOptions ={ where: {id:id} };
      let profesor: ProfesorDto = await this.profesorRepository.findOne(criterio);
      if(profesor){
        return profesor;
      }else{
        throw new Error('No se encontró el profesor')
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Profesor - ' + error

      },HttpStatus.NOT_FOUND)
    }    
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto):Promise<any> {
    try{
      let criterio:FindOneOptions = { where: {id:id} };
      let profesor:Profesor = await this.profesorRepository.findOne(criterio);
      if(!updateProfesorDto){
        throw new Error('No se pudo modificar los datos del profesor');
      }else{
        let nombreViejo = profesor.getNombre();
        let apellidoViejo = profesor.getApellido();
        if(nombreViejo != null || nombreViejo != undefined){
          profesor.setNombre(updateProfesorDto.nombre);
          profesor = await this.profesorRepository.save(profesor);      
        }
        if(apellidoViejo != null || apellidoViejo != undefined){
          profesor.setApellido(updateProfesorDto.apellido);
          profesor = await this.profesorRepository.save(profesor);
        }
        return `OK - datos de Profesor: ${apellidoViejo}, ${nombreViejo} --> modificado por: Apellido:${updateProfesorDto.apellido}, nombre:${updateProfesorDto.nombre}.`
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Profesor - ' + error

      },HttpStatus.NOT_FOUND)
    }
  }


  async remove(id: number):Promise<any> {
    try{
      let criterio:FindOneOptions = { where:{ id: id }};
      let profesor: Profesor = await this.profesorRepository.findOne(criterio);
      if(profesor){
        await this.profesorRepository.remove(profesor);
        return {
                messege: "se ha eliminado el profesor: ",
                id: id,
                apellido: profesor.getApellido(),
                nombre: profesor.getNombre()
                }
      }else{
        throw new Error('No se ha podido eliminar el profesor');
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Profesor - ' + error

      },HttpStatus.NOT_FOUND)
    }    
  }
}
