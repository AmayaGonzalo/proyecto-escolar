import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './dto/profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() createProfesorDto: ProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Post('adddomicilio')
  async addDomicilio(@Body() body: any): Promise<any> {
    return this.profesorService.createDomicilio(body);
  }

  @Get()
  async getProfesores():Promise<ProfesorDto[]> {
    return await this.profesorService.findAll();
  }

  @Get(':id')
  async getProfesor(@Param('id') id: number):Promise<ProfesorDto> {
    return await this.profesorService.findOne(id);
  }

  @Put('update/:id')
  async updateProfesor(@Param('id') id: number, @Body() updateProfesorDto: UpdateProfesorDto):Promise<any> {
    return await this.profesorService.update(id, updateProfesorDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number):Promise<any> {
    return await this.profesorService.remove(id);
  }
}
