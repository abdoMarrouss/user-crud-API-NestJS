import { Module } from '@nestjs/common';
import { KafkaClientService } from './service/kafka-client.service';
import { KafkaClientController } from './controller/kafka-client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // ClientsModule.register([
  //   {
  //     name: 'HERO_SERVICE',
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         clientId: 'kafka_client',
  //         brokers: ['localhost:9092'],
  //       },
  //       consumer: {
  //         groupId: 'my-group'
  //       }
  //     }
  //   },
  // ]),
  // ClientsModule.registerAsync([{
  //   name: 'kafka_client',
  //   useFactory: async (configService: ConfigService) => ({
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         brokers: ['localhost:9092'],
  //         clientId: 'kafka_client',
  //         requestTimeout: 60000
  //       },
  //       consumer: {
  //         groupId: 'my-group'
  //       }
  //     },
  //   }),
  //   inject: [ConfigService]
  // }]),
  ClientsModule.register([
    {
      name: 'HERO_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'hero',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'hero-consumer'
        }
      }
    },
  ])
],
  providers: [KafkaClientService],
  controllers: [KafkaClientController]
})
export class  KafkaClientModule {}
