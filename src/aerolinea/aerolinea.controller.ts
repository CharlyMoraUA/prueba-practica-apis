import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AerolineaService } from './aerolinea.service';
import { AerolineaEntity } from './aerolinea.entity';

@Controller('airlines')
export class AerolineaController {
  constructor(private readonly aerolineaService: AerolineaService) {}

  @Get()
  async findAll(): Promise<AerolineaEntity[]> {
    return this.aerolineaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AerolineaEntity> {
    return this.aerolineaService.findOne(id);
  }

  @Post()
  async create(@Body() aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
    return this.aerolineaService.create(aerolinea);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
    return this.aerolineaService.update(id, aerolinea);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.aerolineaService.delete(id);
  }
}
