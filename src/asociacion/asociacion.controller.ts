import { Controller, Get, Param, Post, Body, Put, Delete, UseInterceptors,HttpCode } from '@nestjs/common';
import { AsociacionService } from './asociacion.service';
import { AerolineaEntity } from 'src/aerolinea/aerolinea.entity';
import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('airlines/:aerolineaId/airports')
@UseInterceptors(BusinessErrorsInterceptor)
export class AsociacionController {
  constructor(private readonly asociacionService: AsociacionService) {}

  @Post(':aeropuertoId')
  async addAirportToAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Param('aeropuertoId') aeropuertoId: number,
  ): Promise<void> {
    return this.asociacionService.addAirportToAirline(aerolineaId, aeropuertoId);
  }

  @Get()
  async findAirportsFromAirline(@Param('aerolineaId') aerolineaId: number): Promise<AeropuertoEntity[]> {
    return this.asociacionService.findAirportsFromAirline(aerolineaId);
  }

  @Get(':aeropuertoId')
  async findAirportFromAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Param('aeropuertoId') aeropuertoId: number,
  ): Promise<AeropuertoEntity> {
    return this.asociacionService.findAirportFromAirline(aerolineaId, aeropuertoId);
  }

  @Put()
  async updateAirportsFromAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Body() nuevosAeropuertos: AeropuertoEntity[],
  ): Promise<void> {
    return this.asociacionService.updateAirportsFromAirline(aerolineaId, nuevosAeropuertos);
  }

  @Delete(':aeropuertoId')
  @HttpCode(204)
  async deleteAirportFromAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Param('aeropuertoId') aeropuertoId: number,
  ): Promise<void> {
    return this.asociacionService.deleteAirportFromAirline(aerolineaId, aeropuertoId);
  }
}
