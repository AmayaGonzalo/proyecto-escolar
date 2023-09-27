import { Module } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EstudianteClase } from 'src/estudiante/entities/estudianteClase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clase,Profesor,Escuela,Estudiante,EstudianteClase])],
  controllers: [ClasesController],
  providers: [ClasesService],
})
export class ClasesModule {}
