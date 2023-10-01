import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { EstudianteClase } from './entities/estudianteClase.entity';
import { CiudadEstudiante } from 'src/ciudad/entities/ciudad_estudiante.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Injectable()
export class EstudianteService {

  constructor(@InjectRepository(Estudiante)
              private estudianteRepository:Repository<Estudiante>,
              @InjectRepository(Clase)
              private claseRepository:Repository<Clase>,
              @InjectRepository(EstudianteClase)
              private estudianteClaseRepository:Repository<EstudianteClase>,
              @InjectRepository(CiudadEstudiante)
              private readonly ciudadEstudianteRepository:Repository<CiudadEstudiante>,
              @InjectRepository(Ciudad)
              private readonly ciudadRepository:Repository<Ciudad>
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

  async createDomicilio(body):Promise<any>{
    try{
      const { ciudadId, estudianteId, domicilio } = body;
      const ciudad : Ciudad = await this.ciudadRepository.findOne({where:{id:ciudadId}});
      if(!ciudad){
        throw new Error('No se encontró esa ciudad');
      }else{
        const estudiante:Estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}});
        if(!estudiante){
          throw new Error('No se encontró ese estudiante');
        }else{
          const domicilioEstudiante: CiudadEstudiante = await this.ciudadEstudianteRepository.findOne({where:{ciudadId:ciudadId,estudianteId:estudianteId}});
          if(!domicilioEstudiante){
            return await this.ciudadEstudianteRepository.save(new CiudadEstudiante(estudianteId,ciudadId,domicilio));
          }
          else{
            throw new Error('El estudiante ya tiene asignado un domicilio');
          }
        }
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
          error: 'Error en Estudiante - ' + error
        },HttpStatus.NOT_FOUND);
    }
  }

  async updateDomicilio(body:any):Promise<any>{
    try{
      const { estudianteId, ciudadId, domicilio } = body;
      const estudianteCiudad: CiudadEstudiante = await this.ciudadEstudianteRepository.findOne({ where:{estudianteId:estudianteId, ciudadId:ciudadId} });
      if(!estudianteCiudad){
        throw new Error('No se encontró el domicilio del estudiante');
      }else{
        const domicilioViejo = estudianteCiudad.getDirecccion();
        if(domicilio != null || domicilio != undefined){
          estudianteCiudad.setDireccion(domicilio);
          await this.ciudadEstudianteRepository.save(estudianteCiudad);
          return `OK - Se ha modificado el nombre ${domicilioViejo} por ${estudianteCiudad.getDirecccion}.`;
        }
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
          error: 'Error en Estudiante - ' + error
        },HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<Estudiante[]> {
    return this.estudianteRepository.find();
  }

  async findOne(id: number):Promise<Estudiante> {
    try{
      const criterio:FindOneOptions ={ where:{id:id},relations:['ciudadEstudiante']};
      const estudiante:Estudiante = await this.estudianteRepository.findOne(criterio);
      if(estudiante){
        return estudiante;
      }else{
        throw new Error('No se ha encontrado el estudiante');
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
          error: 'Error en Estudiante - ' + error
        },HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, estudianteDto: EstudianteDto):Promise<EstudianteDto> {
    try{
      let estudiante: Estudiante = await this.estudianteRepository.findOne({where:{id:id}});
      if(!estudiante){
        throw new Error('No se ha encontrado el estudiante');
      }else{        
        if(estudianteDto.nombre != null || estudianteDto.nombre != undefined){
          estudiante.setNombre(estudianteDto.nombre);
          estudiante = await this.estudianteRepository.save(estudiante);
        }
        if(estudianteDto.apellido != null || estudianteDto.apellido != undefined){
          estudiante.setApellido(estudianteDto.apellido);
          estudiante = await this.estudianteRepository.save(estudiante);
        }
        if(estudianteDto.fechaNacimiento != null || estudianteDto.fechaNacimiento != undefined){
          estudiante.setFechaNacimiento(estudianteDto.fechaNacimiento);
          estudiante = await this.estudianteRepository.save(estudiante);
        }
        return estudiante;
      }
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
          error: 'Error en Estudiante - ' + error
        },HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
