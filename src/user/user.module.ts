import { Module } from '@nestjs/common';
import { UserService } from "./service/user.service";
import { UserController} from "./controller/user.controller";
import {User, UserSchema} from "./schema/user.schema";
import { MongooseModule} from "@nestjs/mongoose";



@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}


