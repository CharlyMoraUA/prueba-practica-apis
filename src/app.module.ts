import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from './aerolinea/aerolinea.entity';
import { AeropuertoEntity } from './aeropuerto/aeropuerto.entity';
import { AsociacionModule } from './asociacion/asociacion.module';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'parcialCarlosApis',
    entities: [AerolineaEntity, AeropuertoEntity],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true,
  }),
  AerolineaModule, 
  AeropuertoModule, 
  AsociacionModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
