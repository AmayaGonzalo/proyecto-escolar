import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post('crear')
  async create(@Body() createAsistenciaDto: CreateAsistenciaDto):Promise<any> {
    return await this.asistenciaService.create(createAsistenciaDto);
  }

  @Get()
  async findAll():Promise<Asistencia[]> {
    return await this.asistenciaService.findAll();
  }

  @Get('obtener/:id1/:id2')
  async getIdAsistencia(@Param('id1') id1: number,@Param('id2')id2:number):Promise<Asistencia> {
    return await this.asistenciaService.findOne(id1,id2);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
  //   return this.asistenciaService.update(+id, updateAsistenciaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.asistenciaService.remove(+id);
  // }
}
