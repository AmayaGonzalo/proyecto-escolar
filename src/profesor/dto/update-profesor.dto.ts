import { PartialType } from '@nestjs/mapped-types';
import { ProfesorDto } from './profesor.dto';

export class UpdateProfesorDto extends PartialType(ProfesorDto) {
    readonly nombre: string;
    readonly apellido: string;
}
