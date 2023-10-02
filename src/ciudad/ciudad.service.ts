import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CiudadDto } from './dto/ciudad.dto';

@Injectable()
export class CiudadService {

    private ciudades: Ciudad[] = [];

    constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>
    ){}

    async findAllRaw(): Promise<CiudadDto[]>{
        try{
            this.ciudades = [];
            let datos = await this.ciudadRepository.query("select * from ciudad");    
            datos.forEach(element => {
                let ciudad : Ciudad = new Ciudad(element['nombre']);
                this.ciudades.push(ciudad);
            });
            if(!datos){
                throw new Error('No se encontraron las ciudades');
            }else{
                return this.ciudades;
            }           
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND);
        }
       
    }

    async findAllOrm(): Promise<CiudadDto[]>{
        try{
            let ciudad: CiudadDto[]=  await this.ciudadRepository.find();
            if(ciudad){
                return ciudad;
            }else{
                throw new Error('No se encontraron las ciudades');
            }
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND);
        }
    }

    async findById(id: number) : Promise<CiudadDto>{
        try{
            const criterio: FindOneOptions = { where: {id: id}};
            const ciudad: CiudadDto = await this.ciudadRepository.findOne( criterio );
            if(ciudad)
                return ciudad;
            else
                throw new Error('No se encuentra la ciudad');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND)
        }
    }

    async create(ciudadDto: CiudadDto) : Promise<CiudadDto>{
        try{
            const ciudad : Ciudad = await this.ciudadRepository.save(new Ciudad(ciudadDto.nombre));
            if(ciudad)
                return ciudadDto;
            else
                throw new Error('No se pudo crear la ciudad');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en ciudad - ' + error
            },HttpStatus.NOT_FOUND);
        }
    }


        //Si llega en el UPDATE una ciudadDto
        // ciudad{
        //     "id": "1",
        //     "nombre": "Mar del Plata",
        //     "habitantes": 12000
        // }

    async update(ciudadDto: CiudadDto, id: number) : Promise<String>{
        try{
            const criterio : FindOneOptions = { where:{ id : id}};
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            //busca en la base de datos y trae una ciudad de "Rio Grande"
            // ciudad{
            //     "id": "1",
            //     "nombre": "Río Grande",
            //     "habitantes": 98.017
            // }
        
            if(!ciudad)
                throw new Error('No se pudo encontrar la ciudad a modificar');        
            else{
                let ciudadVieja = ciudad.getNombre();   //guarda en la variable ciudadVieja el nombre de "Río Grande"                 
                if(ciudadDto.nombre != null || ciudadDto.nombre != undefined){
                    ciudad.setNombre(ciudadDto.nombre);     //Cambia el nombre por "Mar del Plata"
                    ciudad = await this.ciudadRepository.save(ciudad);  //guarda el nombre "Mar del Plata en la Base de datos"
                    return `OK - ${ciudadVieja} --> ${ciudadDto.nombre}`;
                }                            
            }            
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en ciudad - ' + error

            },HttpStatus.NOT_FOUND);
        }        
    }

    async delete(id: number): Promise<any>{
        try{
            const criterio : FindOneOptions = { where: { id : id }};
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            if(!ciudad)
                throw new Error('No se pudo eliminar la ciudad');
            else{
                await this.ciudadRepository.remove(ciudad);
                return {
                        id: id,
                        nombre: ciudad.getNombre(),
                        message: 'se ha eliminado exitosamente'
                        }
            }
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en ciudad - ' + error

            },HttpStatus.NOT_FOUND);
        }
    }




}
