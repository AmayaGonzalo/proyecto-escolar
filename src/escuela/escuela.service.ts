import { Injectable } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { UpdateEscuelaDto } from './dto/update-escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EscuelaService {
constructor(@InjectRepository(Escuela)
            private readonly escuelaRepositoy:Repository<Escuela>
            ){}

  create(createEscuelaDto: CreateEscuelaDto) {
    return 'This action adds a new escuela';
  }

  async findAll(): Promise<Escuela[]>{
    return await this.escuelaRepositoy.find({ relations: ['ciudad']});
  }

  findOne(id: number) {
    return `This action returns a #${id} escuela`;
  }

  update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
    return `This action updates a #${id} escuela`;
  }

  remove(id: number) {
    return `This action removes a #${id} escuela`;
  }
}
