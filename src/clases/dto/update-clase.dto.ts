import { PartialType } from '@nestjs/mapped-types';
import { ClaseDto } from './clase.dto';

export class UpdateClaseDto extends PartialType(ClaseDto) {}
