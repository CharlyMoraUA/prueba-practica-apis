import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoEntity } from './aeropuerto.entity';

@Controller('airports')
export class AeropuertoController {
  constructor(private readonly aeropuertoService: AeropuertoService) {}

  @Get()
  async findAll(): Promise<AeropuertoEntity[]> {
    return this.aeropuertoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AeropuertoEntity> {
    return this.aeropuertoService.findOne(id);
  }

  @Post()
  async create(@Body() aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {
    return this.aeropuertoService.create(aeropuerto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {
    return this.aeropuertoService.update(id, aeropuerto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.aeropuertoService.delete(id);
  }
}
