import { PartialType } from '@nestjs/mapped-types';
import { EscuelaDto } from './escuela.dto';

export class UpdateEscuelaDto extends PartialType(EscuelaDto) {}
