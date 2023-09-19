import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { Clase } from './entities/clase.entity';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get('obtenerAll')
  async getAll(): Promise<Clase[]> {
    return await this.clasesService.findAll(); 
  }

  @Get('obtener/:id')
  async buscarId(@Param('id') id: number): Promise<Clase>{
    return await this.clasesService.findOne(id);
  }

  @Post('crear')
  async crearClase(@Body() clase: Clase): Promise<boolean>{
    return await this.clasesService.create(clase);
  }

  @Put('actualizar/:id')
  async actualizarClase(@Body() clase: Clase, @Param('id')id: number):Promise<String>{
    return await this.clasesService.update(id, clase);
  }

  @Delete('eliminar')
  async eliminarId(@Param()id: number): Promise<boolean>{
    return await this.clasesService.remove(id);
  }
}
