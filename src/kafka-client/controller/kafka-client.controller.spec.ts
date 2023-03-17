import { Test, TestingModule } from '@nestjs/testing';
import { KafkaClientController } from './kafka-client.controller';

describe('KafkaClientController', () => {
  let controller: KafkaClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KafkaClientController],
    }).compile();

    controller = module.get<KafkaClientController>(KafkaClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
