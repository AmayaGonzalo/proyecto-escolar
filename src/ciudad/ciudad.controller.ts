import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDto } from './dto/ciudad.dto';

@Controller('ciudad')
export class CiudadController {

    constructor(private readonly ciudadService: CiudadService){}

    @Get('raw')
    async getAllRaw():Promise<CiudadDto[]>{
        return this.ciudadService.findAllRaw();
    }

    @Get('orm')
    async getAllOrm():Promise<CiudadDto[]>{
        return this.ciudadService.findAllOrm();
    }

    @Get(':id')
    async getId(@Param('id')id:number):Promise<CiudadDto>{
        return await this.ciudadService.findById(id);
    }

    @Post('crear')
    async crearCiudad(@Body() ciudadDto: CiudadDto): Promise<CiudadDto>{
        return await this.ciudadService.create(ciudadDto);
    }

    @Put('actualizar/:id')
    async actualizarCiudadId(@Body() ciudadDto, @Param('id') id: number): Promise<String>{
        return await this.ciudadService.update(ciudadDto, id);
    }

    @Delete('eliminar/:id')
    async eliminarCiudad(@Param('id') id: number): Promise<any>{
        return await this.ciudadService.delete(id);
    }

}
