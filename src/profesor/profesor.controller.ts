import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './dto/profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get()
  async getProfesores():Promise<ProfesorDto[]> {
    return await this.profesorService.findAll();
  }

  @Get(':id')
  async getProfesor(@Param('id') id: number):Promise<ProfesorDto> {
    return await this.profesorService.findOne(id);
  }

  @Get('domicilio/:id')
  async getProfesorDomicilio(@Param('id') id: number):Promise<Profesor>{
    return await this.profesorService.getDomicWithProf(id);
  }

  @Post('new')
  async createProfesor(@Body() profesorDto: ProfesorDto):Promise<ProfesorDto>{
  return await this.profesorService.newProfesor(profesorDto);
  }

  @Post('adddomicilio')
  async addDomicilio(@Body() body: any): Promise<any> {
    return await this.profesorService.createDomicilio(body);
  }

  @Post('addclase')
  async asignarClase(@Body() body:any):Promise<any>{
    return await this.profesorService.asignarClase(body);
  }

  @Put('update/:id')
  async updateProfesor(@Param('id') id: number, @Body() updateProfesorDto: UpdateProfesorDto):Promise<any> {
    return await this.profesorService.update(id, updateProfesorDto);
  }

  @Put('updatedomicilio')
  async updateDomicilioProf(@Body() body:any):Promise<any>{
    return await this.profesorService.updateDomicilio(body);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number):Promise<any> {
    return await this.profesorService.remove(id);
  }
}
