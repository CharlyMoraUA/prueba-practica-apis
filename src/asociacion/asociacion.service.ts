import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineaEntity } from 'src/aerolinea/aerolinea.entity';
import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';

@Injectable()
export class AsociacionService {
  constructor(
    @InjectRepository(AerolineaEntity)
    private readonly aerolineaRepository: Repository<AerolineaEntity>,
    @InjectRepository(AeropuertoEntity)
    private readonly aeropuertoRepository: Repository<AeropuertoEntity>,
  ) {}

  async addAirportToAirline(aerolineaId: number, aeropuertoId: number): Promise<void> {
    let id = aerolineaId
    const aerolinea = await this.aerolineaRepository.findOne({where:{id}, relations: ['aeropuertos']});
    id = aeropuertoId
    const aeropuerto = await this.aeropuertoRepository.findOne({where:{id}});

    if (!aerolinea || !aeropuerto) {
      throw new NotFoundException('Aerolínea o aeropuerto no encontrado');
    }

    aerolinea.aeropuertos = [...aerolinea.aeropuertos, aeropuerto];
    await this.aerolineaRepository.save(aerolinea);
  }

  async findAirportsFromAirline(aerolineaId: number): Promise<AeropuertoEntity[]> {
    let id = aerolineaId
    const aerolinea = await this.aerolineaRepository.findOne({where:{id}, relations: ['aeropuertos'] });

    if (!aerolinea) {
      throw new NotFoundException('Aerolínea no encontrada');
    }

    return aerolinea.aeropuertos;
  }

  async findAirportFromAirline(aerolineaId: number, aeropuertoId: number): Promise<AeropuertoEntity> {
    let id = aerolineaId
    const aerolinea = await this.aerolineaRepository.findOne({where:{id}, relations: ['aeropuertos'] });

    if (!aerolinea) {
      throw new NotFoundException('Aerolínea no encontrada');
    }
    id = aeropuertoId
    const aeropuerto = aerolinea.aeropuertos.find(a => a.id == id);

    if (!aeropuerto) {
      throw new NotFoundException('Aeropuerto no encontrado en la aerolínea');
    }

    return aeropuerto;
  }

  async updateAirportsFromAirline(aerolineaId: number, nuevosAeropuertos: AeropuertoEntity[]): Promise<void> {
    let id = aerolineaId
    const aerolinea = await this.aerolineaRepository.findOne({where:{id}, relations: ['aeropuertos']});

    if (!aerolinea) {
      throw new NotFoundException('Aerolínea no encontrada');
    }

    aerolinea.aeropuertos = nuevosAeropuertos;
    await this.aerolineaRepository.save(aerolinea);
  }

  async deleteAirportFromAirline(aerolineaId: number, aeropuertoId: number): Promise<void> {
    let id = aerolineaId
    const aerolinea = await this.aerolineaRepository.findOne({where:{id}, relations: ['aeropuertos']});

    if (!aerolinea) {
      throw new NotFoundException('Aerolínea no encontrada');
    }

    aerolinea.aeropuertos = aerolinea.aeropuertos.filter(a => a.id !== aeropuertoId);
    await this.aerolineaRepository.save(aerolinea);
  }
}
