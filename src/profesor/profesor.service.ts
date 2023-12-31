import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfesorDto } from './dto/profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';
import { Clase } from 'src/clases/entities/clase.entity';


@Injectable()
export class ProfesorService {

  constructor(@InjectRepository(Profesor)
              private readonly profesorRepository:Repository<Profesor>,
              @InjectRepository(Ciudad)
              private readonly ciudadRepository:Repository<Ciudad>,
              @InjectRepository(CiudadProfesor)
              private readonly ciudadProfesorRepository:Repository<CiudadProfesor>,
              @InjectRepository(Clase)
              private readonly claseRepository:Repository<Clase>
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
      },HttpStatus.NOT_FOUND);
    }
  }

  async createDomicilio(body):Promise<any>{
    try{
      const { ciudadId, profesorId, domicilio } = body;
      //consultar y verificar si el profesor existe
      const profesor = await this.profesorRepository.findOne({ where:{ id: profesorId } });
      if(!profesor)
        throw new Error('error - no existe el profesor');
      
      //consultar y verificar si la ciudad existe
      const ciudad = await this.ciudadRepository.findOne({ where:{ id: ciudadId}});
      if(!ciudad)
        throw new Error('error - no existe esa ciudad');

      //si el id_profesor y id_ciudad existe dentro de ciudad_profesor(tabla)
      const newDomicilio = await this.ciudadProfesorRepository.findOne({ where:{ciudadId:ciudadId, profesorId:profesorId}});
      if(newDomicilio)
        throw new Error('el profesor ya tiene asignado un domicilio');
      return await this.ciudadProfesorRepository.save(new CiudadProfesor(ciudadId, profesorId, domicilio));
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Profesor - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }

  async asignarClase(body): Promise<any>{
    try{
      const { profesorId, claseId } = body;
      let profesor: Profesor = await this.profesorRepository.findOne({where:{id:profesorId}});
      if(!profesor){
        throw new Error('No se encontró el profesor');
      }else{
        let clase: Clase = await this.claseRepository.findOne({where:{id:claseId}});
        if(!clase){
          throw new Error('No se encontró la clase');
        }else{
          clase.profesor = profesor; // Asignamos a la clase el profesor a través de foreign key, es decir cargamos una foreign key
          await this.claseRepository.save(clase);
          return clase;
        }
      }

    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Profesor - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }

  async updateDomicilio(body):Promise<any>{
    try{
      const { profesorId, ciudadId, domicilio } = body;
      const profesorCiudad: CiudadProfesor = await this.ciudadProfesorRepository.findOne({ where:{profesorId:profesorId,ciudadId:ciudadId }});      
      if(!profesorCiudad){
        throw new Error('No se encontró el domicilio del profesor');
      }else{
        const domicilioViejo = profesorCiudad.getDirecccion();
        if(domicilio !=null || domicilio != undefined){
          profesorCiudad.setDireccion(domicilio);
          await this.ciudadProfesorRepository.save(profesorCiudad);
          return `OK - Se modificó ${domicilioViejo} --> ${profesorCiudad.domicilio}.`;
        }
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Profesor - ' + error

      },HttpStatus.NOT_FOUND);
    }
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
      },HttpStatus.NOT_FOUND);
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
      },HttpStatus.NOT_FOUND);
    }    
  }

  async getDomicWithProf(id: number): Promise<Profesor>{
    try{
      const criterio: FindOneOptions = { where: { id:id }, relations:['ciudadProfesor'] };
      const profesor:Profesor = await this.profesorRepository.findOne(criterio);
      if(!profesor){
        throw new Error('No se encontró el profesor');
      }else{
        return profesor;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error en Profesor - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto):Promise<any> {
    try{
      const criterio:FindOneOptions = { where: {id:id} };
      let profesor:Profesor = await this.profesorRepository.findOne(criterio);
      if(!updateProfesorDto){
        throw new Error('No se pudo modificar los datos del profesor');
      }else{
        let nombreViejo = profesor.getNombre();
        let apellidoViejo = profesor.getApellido();
        if(updateProfesorDto.nombre != null || updateProfesorDto.nombre != undefined){
          profesor.setNombre(updateProfesorDto.nombre);
          profesor = await this.profesorRepository.save(profesor);      
        }
        if(updateProfesorDto.apellido != null || updateProfesorDto.apellido != undefined){
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
      },HttpStatus.NOT_FOUND);
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
      },HttpStatus.NOT_FOUND);
    }    
  }
}