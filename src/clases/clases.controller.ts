import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { Clase } from './entities/clase.entity';
import { EstudianteClase } from 'src/estudiante/entities/estudianteClase.entity';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService,
    ) {}

  @Get('obtenerAll')
  async getAll(): Promise<Clase[]> {
    return await this.clasesService.findAll(); 
  }

  @Get('obtenerallrelations')
  async getAllrelation(): Promise<EstudianteClase[]> {
    return await this.clasesService.findAllwithRelations(); 
  }

  @Get('obtener/:id')
  async buscarId(@Param('id') id: number): Promise<Clase>{
    return await this.clasesService.findOneWithEstudiantes(id);
  }

  @Post('crear')
  async crearClase(@Body() clase: Clase): Promise<Clase>{
    return await this.clasesService.create(clase);    
  }

  @Put('actualizar/:id')
  async actualizarClase(@Body() clase: Clase, @Param('id')id: number):Promise<String>{
    return await this.clasesService.update(id, clase);
  }

  @Delete('eliminar/:id')
  async eliminarClase(@Param('id')id: number): Promise<any>{
    return await this.clasesService.remove(id);
  }
}
