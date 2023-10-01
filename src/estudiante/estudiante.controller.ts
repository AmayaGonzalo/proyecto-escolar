import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('crear')
  async create(@Body() estudianteDto: EstudianteDto): Promise<EstudianteDto> {
    return this.estudianteService.create(estudianteDto);
  }

  @Post('crearconrelacion')
  async createConRelacion(@Body() body: any): Promise <any>{
    return this.estudianteService.addClase(body);
  }

  @Post('addclase')
  async agregarClase(@Body() body: any): Promise <any>{
    return this.estudianteService.addClase(body);
  }

  @Post('adddomicilio')
  async addDomicilio(@Body() body: any): Promise<any> {
    return await this.estudianteService.createDomicilio(body);
  }

  @Get()
  async findAll():Promise<Estudiante[]> {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number):Promise<Estudiante> {
    return await this.estudianteService.findOne(id);
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() estudianteDto: EstudianteDto): Promise<EstudianteDto> {
    return await this.estudianteService.update(id, estudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
