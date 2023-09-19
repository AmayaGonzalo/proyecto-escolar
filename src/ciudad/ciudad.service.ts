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
        this.ciudades = [];
        let datos = await this.ciudadRepository.query("select * from ciudad");

        datos.forEach(element => {
            let ciudad : Ciudad = new Ciudad(element['nombre']);
            this.ciudades.push(ciudad)
        });
        return this.ciudades;
    }

    async findAllOrm(): Promise<CiudadDto[]>{
        return await this.ciudadRepository.find();
    }

    async findById(id: number) : Promise<CiudadDto>{
        try{
            const criterio: FindOneOptions = { where: {id: id}};
            let ciudad: Ciudad = await this.ciudadRepository.findOne( criterio );
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
            let ciudad : Ciudad = await this.ciudadRepository.save(new Ciudad(ciudadDto.nombre));
            if(ciudad)
                return ciudadDto;
            else
                throw new Error('No se pudo crear la ciudad');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en ciudad - ' + error

            },HttpStatus.NOT_FOUND)
        }
    }

    async update(ciudadDto: CiudadDto, id: number) : Promise<String>{
        const criterio : FindOneOptions = { where:{ id : id}};
        let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
        
        if(!ciudad)
            throw new Error('No se pudo encontrar la ciudad a modificar');        
        else{
            let ciudadVieja = ciudad.getNombre();
            ciudad.setNombre(ciudadDto.nombre);
            ciudad = await this.ciudadRepository.save(ciudad);
            return `OK - ${ciudadVieja} --> ${ciudadDto.nombre}`;
        }
    }




}
