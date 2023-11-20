import { Controller, Get, Param, HttpCode, Post, Body, Put, Delete, UseInterceptors } from '@nestjs/common';
import { AerolineaService } from './aerolinea.service';
import { AerolineaEntity } from './aerolinea.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('airlines')
@UseInterceptors(BusinessErrorsInterceptor)
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
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<void> {
    return this.aerolineaService.delete(id);
  }
}
