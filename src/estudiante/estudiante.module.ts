import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Clase } from 'src/clases/entities/clase.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Estudiante,Clase])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
