import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Clase } from 'src/clases/entities/clase.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor,Clase,CiudadProfesor,Ciudad])],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
