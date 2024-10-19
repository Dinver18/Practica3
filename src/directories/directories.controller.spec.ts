import { Test, TestingModule } from '@nestjs/testing';
import { DirectoriesController } from './directories.controller';
import { DirectoriesService } from './directories.service';

describe('DirectoriesController', () => {
  let appController: DirectoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DirectoriesController],
      providers: [DirectoriesService],
    }).compile();

    appController = app.get<DirectoriesController>(DirectoriesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
