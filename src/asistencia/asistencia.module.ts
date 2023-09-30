import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { EstudianteClase } from 'src/estudiante/entities/estudianteClase.entity';
import { Clase } from 'src/clases/entities/clase.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Asistencia,EstudianteClase,Clase,Estudiante])],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
