import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity';

@Injectable()
export class AerolineaService {
  constructor(
    @InjectRepository(AerolineaEntity)
    private readonly aerolineaRepository: Repository<AerolineaEntity>,
  ) {}

  async findAll(): Promise<AerolineaEntity[]> {
    return this.aerolineaRepository.find();
  }

  async findOne(id: number): Promise<AerolineaEntity> {
    const aerolinea = await this.aerolineaRepository.findOne({where:{id}});
    if (!aerolinea) {
      throw new NotFoundException(`Aerolinea con ID ${id} no encontrada`);
    }
    return aerolinea;
  }

  async create(aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
    if (this.isFechaFundacionValid(aerolinea.fechaFundacion)) {
      return this.aerolineaRepository.save(aerolinea);
    } else {
      throw new Error('La fecha de fundación debe ser en el pasado.');
    }
  }

  async update(id: number, aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
    const existingAerolinea = await this.findOne(id);

    if (this.isFechaFundacionValid(aerolinea.fechaFundacion)) {
      return this.aerolineaRepository.save({ ...existingAerolinea, ...aerolinea });
    } else {
      throw new Error('La fecha de fundación debe ser en el pasado.');
    }
  }

  async delete(id: number): Promise<void> {
    await this.aerolineaRepository.delete(id);
  }

  private isFechaFundacionValid(fecha: Date): boolean {
    const newdate = new Date(fecha);
    const isvalid = newdate < new Date();
    return isvalid;
  }
}
