import { Module } from '@nestjs/common';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';

@Module({
  controllers: [CiudadController],
  providers: [CiudadService]
})
export class CiudadModule {}
