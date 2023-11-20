import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { AeropuertoEntity } from './aeropuerto.entity';

describe('AeropuertoService', () => {
  let aeropuertoService: AeropuertoService;
  let aeropuertoRepository: Repository<AeropuertoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AeropuertoService,
        {
          provide: getRepositoryToken(AeropuertoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    aeropuertoService = module.get<AeropuertoService>(AeropuertoService);
    aeropuertoRepository = module.get<Repository<AeropuertoEntity>>(getRepositoryToken(AeropuertoEntity));
  });

  describe('findAll', () => {
    it('debe retornar un array de aeropuertos', async () => {
      const aeropuertos: AeropuertoEntity[] = [{ id: 1,
        nombre: 'nombre 1',
        codigo: 'ABC',
        pais: 'pais 1',
        ciudad: 'ciudad 1',
        aerolineas: []}];
      jest.spyOn(aeropuertoRepository, 'find').mockResolvedValue(aeropuertos);

      expect(await aeropuertoService.findAll()).toEqual(aeropuertos);
    });
  });

  describe('findOne', () => {
    it('debe retornar un aeropuerto por id', async () => {
      const aeropuerto: AeropuertoEntity = { id: 1,
        nombre: 'nombre 2',
        codigo: 'DEF',
        pais: 'pais 2',
        ciudad: 'ciudad 2',
        aerolineas: []};
      jest.spyOn(aeropuertoRepository, 'findOne').mockResolvedValue(aeropuerto);

      expect(await aeropuertoService.findOne(1)).toEqual(aeropuerto);
    });

    it('debe retornar not found', async () => {
      jest.spyOn(aeropuertoRepository, 'findOne').mockResolvedValue(null);

      await expect(aeropuertoService.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('debe borrar aeropuerto por id', async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: {} };
      jest.spyOn(aeropuertoRepository, 'delete').mockResolvedValue(deleteResult);
  
      await aeropuertoService.delete(1);
  
      expect(aeropuertoRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
