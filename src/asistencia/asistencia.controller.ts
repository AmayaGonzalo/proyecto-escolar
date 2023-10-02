import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaDto } from './dto/asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post('crear')
  async create(@Body() asistenciaDto: AsistenciaDto):Promise<any> {
    return await this.asistenciaService.create(asistenciaDto);
  }

  @Get()
  async findAll():Promise<Asistencia[]> {
    return await this.asistenciaService.findAll();
  }

  @Get('obtener/:id1/:id2')
  async getIdAsistencia(@Param('id1') id1: number,@Param('id2') id2:number):Promise<any> {
    return await this.asistenciaService.getAsistenciaEstudianteClase(id1,id2);
  }

  @Get('obtener/:claseId')
  async getAsistenciaClase(@Param('claseId') claseId: number):Promise<Asistencia[]>{
    return await this.asistenciaService.getAsistenciaClase(claseId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
  //   return this.asistenciaService.update(+id, updateAsistenciaDto);
  // }

  @Delete('borrar')  
  async remove(@Body() body):Promise<any> {
    return await this.asistenciaService.removeAsistencia(body);
  }
}
