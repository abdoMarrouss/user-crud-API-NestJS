import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {UserModule} from "./user/user.module";
import { AuthModule } from './auth/auth.module';
//import { ProjectModule } from './project/project.module';
import { KafkaClientModule } from './kafka-client/kafka-client.module';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/userDB'), UserModule, AuthModule, KafkaClientModule, ConfigModule.forRoot({isGlobal:true}), TestModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
