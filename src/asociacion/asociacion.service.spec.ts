import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AsociacionService } from './asociacion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';

describe('AsociacionService', () => {
  let asociacionService: AsociacionService;
  let aerolineaRepository: Repository<AerolineaEntity>;
  let aeropuertoRepository: Repository<AeropuertoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AsociacionService,
        {
          provide: getRepositoryToken(AerolineaEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AeropuertoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    asociacionService = module.get<AsociacionService>(AsociacionService);
    aerolineaRepository = module.get<Repository<AerolineaEntity>>(getRepositoryToken(AerolineaEntity));
    aeropuertoRepository = module.get<Repository<AeropuertoEntity>>(getRepositoryToken(AeropuertoEntity));
  });

  describe('addAirportToAirline', () => {
    it('debe agregar aeropuerto a aerolinea', async () => {
      const aerolinea = { id: 1, aeropuertos: [] } as AerolineaEntity;
      const aeropuerto = { id: 1 } as AeropuertoEntity;

      jest.spyOn(aerolineaRepository, 'findOne').mockResolvedValue(aerolinea);
      jest.spyOn(aeropuertoRepository, 'findOne').mockResolvedValue(aeropuerto);
      jest.spyOn(aerolineaRepository, 'save').mockResolvedValue(aerolinea);

      await asociacionService.addAirportToAirline(1, 1);

      expect(aerolinea.aeropuertos).toEqual([aeropuerto]);
      expect(aerolineaRepository.save).toHaveBeenCalledWith(aerolinea);
    });

    it('debe retornar not found de aeropuerto', async () => {
      jest.spyOn(aerolineaRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(aeropuertoRepository, 'findOne').mockResolvedValue(null);

      await expect(asociacionService.addAirportToAirline(1, 1)).rejects.toThrow(NotFoundException);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
