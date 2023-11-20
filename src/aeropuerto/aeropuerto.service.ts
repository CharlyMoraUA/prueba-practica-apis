import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AeropuertoEntity } from './aeropuerto.entity';

@Injectable()
export class AeropuertoService {
  constructor(
    @InjectRepository(AeropuertoEntity)
    private readonly aeropuertoRepository: Repository<AeropuertoEntity>,
  ) {}

  async findAll(): Promise<AeropuertoEntity[]> {
    return this.aeropuertoRepository.find();
  }

  async findOne(id: number): Promise<AeropuertoEntity> {
    const aeropuerto = await this.aeropuertoRepository.findOne({where:{id}});
    if (!aeropuerto) {
      throw new NotFoundException(`Aeropuerto con ID ${id} no encontrado`);
    }
    return aeropuerto;
  }

  async create(aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {
    if (this.isCodigoValid(aeropuerto.codigo)) {
      return this.aeropuertoRepository.save(aeropuerto);
    } else {
      throw new Error('El código del aeropuerto debe tener exactamente tres caracteres.');
    }
  }

  async update(id: number, aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {
    const existingAeropuerto = await this.findOne(id);

    if (this.isCodigoValid(aeropuerto.codigo)) {
      return this.aeropuertoRepository.save({ ...existingAeropuerto, ...aeropuerto });
    } else {
      throw new Error('El código del aeropuerto debe tener exactamente tres caracteres.');
    }
  }

  async delete(id: number): Promise<void> {
    await this.aeropuertoRepository.delete(id);
  }

  private isCodigoValid(codigo: string): boolean {
    return codigo.length === 3;
  }
}

