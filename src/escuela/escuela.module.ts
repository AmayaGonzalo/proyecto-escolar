import { Module } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaController } from './escuela.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Clase } from 'src/clases/entities/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela,Ciudad,Clase])],
  controllers: [EscuelaController],
  providers: [EscuelaService],
})
export class EscuelaModule {}
