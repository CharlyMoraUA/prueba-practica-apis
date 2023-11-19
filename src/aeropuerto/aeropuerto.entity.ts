import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';

@Entity()
export class AeropuertoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  pais: string;

  @Column()
  ciudad: string;

  @ManyToMany(() => AerolineaEntity, aerolinea => aerolinea.aeropuertos)
  aerolineas: AerolineaEntity[];
}
