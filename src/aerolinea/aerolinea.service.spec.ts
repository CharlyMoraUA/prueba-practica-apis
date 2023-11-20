import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AerolineaService } from './aerolinea.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity';

describe('AerolineaService', () => {
  let aerolineaService: AerolineaService;
  let aerolineaRepository: Repository<AerolineaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AerolineaService,
        {
          provide: getRepositoryToken(AerolineaEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    aerolineaService = module.get<AerolineaService>(AerolineaService);
    aerolineaRepository = module.get<Repository<AerolineaEntity>>(getRepositoryToken(AerolineaEntity));
  });

  describe('findAll', () => {
    it('debe retornar array de aerolineas', async () => {
      const aerolineas: AerolineaEntity[] = [
        { id: 1, nombre: 'Aerolinea 1', fechaFundacion: new Date(), descripcion: 'Description', paginaWeb: 'www.example.com', aeropuertos: [] },
        { id: 2, nombre: 'Aerolinea 2', fechaFundacion: new Date(), descripcion: 'Another Description', paginaWeb: 'www.another.com', aeropuertos: [] },
      ];
      jest.spyOn(aerolineaRepository, 'find').mockResolvedValue(aerolineas);

      expect(await aerolineaService.findAll()).toEqual(aerolineas);
    });
  });

  describe('findOne', () => {
    it('debe retornar aerolinea por id', async () => {
      const aerolinea: AerolineaEntity = { 
        id: 1, 
        nombre: 'Aerolinea 1', 
        fechaFundacion: new Date(), 
        descripcion: 'Description', 
        paginaWeb: 'www.example.com', 
        aeropuertos: []
      };

      jest.spyOn(aerolineaRepository, 'findOne').mockResolvedValue(aerolinea);

      expect(await aerolineaService.findOne(1)).toEqual(aerolinea);
    });

    it('debe retornar notfound', async () => {
      jest.spyOn(aerolineaRepository, 'findOne').mockResolvedValue(null);

      await expect(aerolineaService.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
