import { Module } from '@nestjs/common';
import { KafkaClientService } from './service/kafka-client.service';
import { KafkaClientController } from './controller/kafka-client.controller';

@Module({
  providers: [KafkaClientService],
  controllers: [KafkaClientController]
})
export class KafkaClientModule {}
