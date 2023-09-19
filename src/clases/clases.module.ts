import { Module } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clase])],
  controllers: [ClasesController],
  providers: [ClasesService],
})
export class ClasesModule {}
