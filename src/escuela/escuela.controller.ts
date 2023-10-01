import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { Escuela } from './entities/escuela.entity';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Post('new')
  async create(@Body() createEscuelaDto: CreateEscuelaDto):Promise<CreateEscuelaDto> {
    return await this.escuelaService.create(createEscuelaDto);
  }

  @Post('addciudad/:ciudadId/:escuelaId')
  async asinarCiudad(@Param('ciudadId') ciudadId: number,@Param('escuelaId') escuelaId:number):Promise<Escuela>{
    return await this.escuelaService.asignarCiudadAEscuela(ciudadId,escuelaId);
  }

  @Get('all')
  async findAll():Promise<Escuela[]> {
    return await this.escuelaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number):Promise<Escuela> {
    return await this.escuelaService.findOne(id);
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() updateEscuelaDto: UpdateEscuelaDto):Promise<any> {
    return await this.escuelaService.update(id, updateEscuelaDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number):Promise<any> {
    return await this.escuelaService.remove(id);
  }
}
