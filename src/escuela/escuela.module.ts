import { Module } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaController } from './escuela.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela])],
  controllers: [EscuelaController],
  providers: [EscuelaService],
})
export class EscuelaModule {}
