import { PartialType } from '@nestjs/mapped-types';
import { AsistenciaDto } from './asistencia.dto';

export class UpdateAsistenciaDto extends PartialType(AsistenciaDto) {}
