import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {UserModule} from "./user/user.module";
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/userDB'), UserModule, AuthModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
