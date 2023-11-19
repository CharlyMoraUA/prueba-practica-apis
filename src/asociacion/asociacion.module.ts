// asociacion.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsociacionService } from './asociacion.service';
import { AerolineaEntity } from 'src/aerolinea/aerolinea.entity';
import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AerolineaEntity, AeropuertoEntity])],
  providers: [AsociacionService],
  exports: [AsociacionService],
})
export class AsociacionModule {}
