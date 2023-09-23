import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('crear')
  async create(@Body() estudianteDto: EstudianteDto): Promise<EstudianteDto> {
    return this.estudianteService.create(estudianteDto);
  }

  @Post('crearconrelacion')
  async createConRelacion(@Body() EstudianteDto: EstudianteDto): Promise <boolean>{
    return this.estudianteService.createConRelation(EstudianteDto);
  }


  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() estudianteDto: EstudianteDto) {
    return this.estudianteService.update(+id, estudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
