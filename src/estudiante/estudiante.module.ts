import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Clase } from 'src/clases/entities/clase.entity';
import { CiudadEstudiante } from 'src/ciudad/entities/ciudad_estudiante.entity';
import { EstudianteClase } from './entities/estudianteClase.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Estudiante,Clase,CiudadEstudiante,EstudianteClase,Ciudad])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
